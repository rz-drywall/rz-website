import { NextResponse } from 'next/server'

import { company } from '@/lib/site'

type ContactPayload = {
  name?: unknown
  phone?: unknown
  email?: unknown
  projectType?: unknown
  service?: unknown
  message?: unknown
  /** Honeypot — should always be empty for real humans. */
  company?: unknown
}

type ApiResponse = { ok: boolean; error?: string }

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  let body: ContactPayload
  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: a filled "company" field means a bot. Pretend success, do nothing.
  if (asString(body.company)) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const name = asString(body.name)
  const phone = asString(body.phone)
  const email = asString(body.email)
  const projectType = asString(body.projectType)
  const service = asString(body.service)
  const message = asString(body.message)

  if (!name || !phone || !email) {
    return NextResponse.json(
      { ok: false, error: 'Please provide your name, phone, and email.' },
      { status: 400 },
    )
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please provide a valid email address.' },
      { status: 400 },
    )
  }

  const recipient = process.env.CONTACT_TO_EMAIL || company.email
  const lead = {
    name,
    phone,
    email,
    projectType: projectType || 'Not specified',
    service: service || 'Not specified',
    message: message || '(no message)',
  }

  // Graceful fallback: with no API key, log the lead and still succeed so the
  // site works out of the box. Never surface a config error to the visitor.
  if (!process.env.RESEND_API_KEY) {
    console.info('[contact] New lead (RESEND_API_KEY not set, logging only):', lead)
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const subject = `New ${lead.projectType} estimate request — ${lead.name}`
    const text = [
      `New estimate request from the ${company.name} website.`,
      '',
      `Name:         ${lead.name}`,
      `Phone:        ${lead.phone}`,
      `Email:        ${lead.email}`,
      `Project type: ${lead.projectType}`,
      `Service:      ${lead.service}`,
      '',
      'Message:',
      lead.message,
    ].join('\n')

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#0b0c0e;line-height:1.6">
        <h2 style="margin:0 0 4px">New estimate request</h2>
        <p style="margin:0 0 16px;color:#52525b">Submitted from the ${escapeHtml(company.name)} website.</p>
        <table style="border-collapse:collapse;font-size:14px">
          <tr><td style="padding:4px 16px 4px 0;color:#71717a">Name</td><td style="padding:4px 0"><strong>${escapeHtml(lead.name)}</strong></td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#71717a">Phone</td><td style="padding:4px 0"><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#71717a">Email</td><td style="padding:4px 0"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#71717a">Project type</td><td style="padding:4px 0">${escapeHtml(lead.projectType)}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#71717a">Service</td><td style="padding:4px 0">${escapeHtml(lead.service)}</td></tr>
        </table>
        <h3 style="margin:20px 0 4px">Message</h3>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(lead.message)}</p>
      </div>
    `

    const { error } = await resend.emails.send({
      from: 'RZ Drywall <onboarding@resend.dev>',
      to: [recipient],
      replyTo: lead.email,
      subject,
      text,
      html,
    })

    if (error) {
      console.error('[contact] Resend returned an error:', error)
      return NextResponse.json(
        { ok: false, error: 'We could not send your request. Please call us instead.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[contact] Failed to send email:', err)
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again or call us.' },
      { status: 500 },
    )
  }
}
