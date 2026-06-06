'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'
import { Link } from '@/components/link'
import {
  commercialServices,
  company,
  residentialServices,
  serviceAreas,
  social,
} from '@/lib/site'

type ProjectType = 'Residential' | 'Commercial' | 'Repair' | 'Other'

const PROJECT_TYPES: ProjectType[] = ['Residential', 'Commercial', 'Repair', 'Other']

const SERVICE_OPTIONS: string[] = [
  ...residentialServices.map((s) => s.title),
  ...commercialServices.map((s) => s.title),
]

type FormState = {
  name: string
  phone: string
  email: string
  projectType: ProjectType | ''
  service: string
  message: string
  /** Honeypot — must stay empty. */
  company: string
}

type FieldErrors = Partial<Record<'name' | 'phone' | 'email', string>>

type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INITIAL_STATE: FormState = {
  name: '',
  phone: '',
  email: '',
  projectType: '',
  service: '',
  message: '',
  company: '',
}

function validate(state: FormState): FieldErrors {
  const errors: FieldErrors = {}
  if (!state.name.trim()) errors.name = 'Please tell us your name.'
  if (!state.phone.trim()) {
    errors.phone = 'A phone number helps us reach you fast.'
  } else if (state.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'That phone number looks too short.'
  }
  if (!state.email.trim()) {
    errors.email = 'An email lets us send your written quote.'
  } else if (!EMAIL_REGEX.test(state.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  return errors
}

const fieldBase =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-950 shadow-sm outline-none transition placeholder:text-ink-400 focus:border-brand focus:ring-2 focus:ring-brand/30'
const fieldError = 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
const labelBase = 'block text-sm font-medium text-ink-800'

export function ContactClient() {
  const [state, setState] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }))
    if (key in errors) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key as keyof FieldErrors]
        return next
      })
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setServerError(null)

    const validationErrors = validate(state)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name.trim(),
          phone: state.phone.trim(),
          email: state.email.trim(),
          projectType: state.projectType,
          service: state.service,
          message: state.message.trim(),
          company: state.company,
        }),
      })

      const data: { ok: boolean; error?: string } = await res
        .json()
        .catch(() => ({ ok: false }))

      if (!res.ok || !data.ok) {
        setStatus('error')
        setServerError(
          data.error || 'We could not send your request. Please call us instead.',
        )
        return
      }

      setStatus('success')
      setState(INITIAL_STATE)
    } catch {
      setStatus('error')
      setServerError('Network error. Please try again or give us a call.')
    }
  }

  const submitting = status === 'submitting'

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-brand-dark/10 blur-3xl"
        />
        <Container className="relative py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <Subheading dark rule>
              Free estimate
            </Subheading>
            <Heading as="h1" dark className="mt-4">
              Get a free estimate.
            </Heading>
            <Lead className="mt-6 max-w-2xl text-white/85">
              Tell us about your project and we will get right back to you with a clear,
              written quote.{' '}
              <span className="font-semibold text-brand-light">
                The price we quote is the price you pay.
              </span>
            </Lead>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-200">
              <span className="inline-flex items-center gap-2">
                <ShieldCheckIcon className="size-5 text-brand-light" aria-hidden />
                {company.license}
              </span>
              <span className="inline-flex items-center gap-2">
                <ClockIcon className="size-5 text-brand-light" aria-hidden />
                Serving {company.region}
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Form + details */}
      <section className="bg-ink-50 py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="lg:col-span-7"
            >
              <div className="overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-xl shadow-ink-950/5">
                <div aria-hidden className="h-1.5 w-full bg-gradient-to-r from-brand via-brand to-accent" />
                <div className="p-6 sm:p-10">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex flex-col items-start py-8"
                  >
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-brand/15">
                      <CheckCircleIcon className="size-8 text-brand-dark" aria-hidden />
                    </div>
                    <h2 className="mt-6 text-3xl font-medium tracking-tight text-ink-950">
                      Thanks — we got it.
                    </h2>
                    <p className="mt-3 max-w-md text-lg text-ink-600">
                      Your request is in. We will reach out shortly to set up your free
                      estimate. Need us sooner? Call{' '}
                      <Link
                        href={company.phoneHref}
                        className="font-semibold text-brand-dark hover:underline"
                      >
                        {company.phone}
                      </Link>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-8 rounded-full border border-ink-300 px-6 py-2.5 text-sm font-semibold text-ink-800 transition hover:border-ink-400 hover:bg-ink-50"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <span aria-hidden className="h-6 w-1 rounded-full bg-brand" />
                        <h2 className="text-2xl font-medium tracking-tight text-ink-950">
                          Request your estimate
                        </h2>
                      </div>
                      <p className="mt-2 text-sm text-ink-600">
                        Fields marked with an asterisk are required.
                      </p>
                    </div>

                    {/* Honeypot — visually hidden, off-screen, not tab-focusable */}
                    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label htmlFor="company-website">Company website</label>
                      <input
                        id="company-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={state.company}
                        onChange={(e) => update('company', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelBase}>
                          Name <span className="text-brand-dark">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={state.name}
                          onChange={(e) => update('name', e.target.value)}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={`mt-2 ${fieldBase} ${errors.name ? fieldError : ''}`}
                          placeholder="Jane Doe"
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            className="mt-1.5 flex items-center gap-1 text-sm text-red-600"
                          >
                            <ExclamationCircleIcon className="size-4" aria-hidden />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className={labelBase}>
                          Phone <span className="text-brand-dark">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={state.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                          className={`mt-2 ${fieldBase} ${errors.phone ? fieldError : ''}`}
                          placeholder="(916) 555-0123"
                        />
                        {errors.phone && (
                          <p
                            id="phone-error"
                            className="mt-1.5 flex items-center gap-1 text-sm text-red-600"
                          >
                            <ExclamationCircleIcon className="size-4" aria-hidden />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className={labelBase}>
                        Email <span className="text-brand-dark">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={state.email}
                        onChange={(e) => update('email', e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`mt-2 ${fieldBase} ${errors.email ? fieldError : ''}`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-1.5 flex items-center gap-1 text-sm text-red-600"
                        >
                          <ExclamationCircleIcon className="size-4" aria-hidden />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="projectType" className={labelBase}>
                          Project type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={state.projectType}
                          onChange={(e) =>
                            update('projectType', e.target.value as ProjectType | '')
                          }
                          className={`mt-2 ${fieldBase} appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${state.projectType === '' ? 'text-ink-400' : ''}`}
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E\")",
                          }}
                        >
                          <option value="">Select one…</option>
                          {PROJECT_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="service" className={labelBase}>
                          Service interest{' '}
                          <span className="font-normal text-ink-400">(optional)</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={state.service}
                          onChange={(e) => update('service', e.target.value)}
                          className={`mt-2 ${fieldBase} appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${state.service === '' ? 'text-ink-400' : ''}`}
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E\")",
                          }}
                        >
                          <option value="">Not sure yet…</option>
                          {SERVICE_OPTIONS.map((title) => (
                            <option key={title} value={title}>
                              {title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelBase}>
                        Project details{' '}
                        <span className="font-normal text-ink-400">(optional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={state.message}
                        onChange={(e) => update('message', e.target.value)}
                        className={`mt-2 ${fieldBase} resize-y`}
                        placeholder="Tell us about the rooms, square footage, timeline, or anything else that helps us quote accurately."
                      />
                    </div>

                    {status === 'error' && serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                      >
                        <ExclamationCircleIcon className="mt-0.5 size-5 shrink-0" aria-hidden />
                        <span>
                          {serverError} You can always reach us at{' '}
                          <Link
                            href={company.phoneHref}
                            className="font-semibold underline"
                          >
                            {company.phone}
                          </Link>
                          .
                        </span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-light hover:shadow-brand/35 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="size-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-90"
                              fill="currentColor"
                              d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        'Request my free estimate'
                      )}
                    </button>
                    <p className="text-xs text-ink-500">
                      By submitting, you agree to be contacted about your project. We never
                      share your info.
                    </p>
                  </form>
                )}
                </div>
              </div>
            </motion.div>

            {/* Contact details */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="overflow-hidden rounded-3xl bg-ink-950 p-8 text-white shadow-xl shadow-ink-950/20 sm:p-10">
                <h2 className="text-2xl font-medium tracking-tight">
                  Talk to us directly
                </h2>
                <p className="mt-2 text-sm text-ink-300">
                  Prefer a call? We answer the phone — no call center, no runaround.
                </p>

                {/* Prominent tappable phone block */}
                <Link
                  href={company.phoneHref}
                  className="group mt-6 flex items-center gap-4 rounded-2xl bg-brand p-4 shadow-lg shadow-brand/25 ring-1 ring-white/10 transition hover:bg-brand-light"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/15 transition group-hover:bg-white/20">
                    <PhoneIcon className="size-6 text-white" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium tracking-wide text-white/70 uppercase">
                      Call us now
                    </span>
                    <span className="block text-xl font-semibold text-white">
                      {company.phone}
                    </span>
                  </span>
                </Link>

                <dl className="mt-8 space-y-6">
                  <ContactRow icon={EnvelopeIcon} label="Email">
                    <Link
                      href={company.emailHref}
                      className="break-words text-white transition hover:text-brand-light"
                    >
                      {company.email}
                    </Link>
                  </ContactRow>
                  <ContactRow icon={ClockIcon} label="Hours">
                    <span className="text-white">{company.hours}</span>
                  </ContactRow>
                  <ContactRow icon={MapPinIcon} label="Based in">
                    <span className="text-white">{company.baseCity}</span>
                  </ContactRow>
                  <ContactRow icon={ShieldCheckIcon} label="Credentials">
                    <span className="text-ink-300">{company.license}</span>
                  </ContactRow>
                </dl>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="font-mono text-xs font-semibold tracking-widest text-ink-400 uppercase">
                    Service areas
                  </p>
                  <p className="mt-3 text-sm text-ink-300">
                    Proudly serving {company.region}, including:
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {serviceAreas.map((area) => {
                      const isHome = area === company.baseCity.split(',')[0]
                      return (
                        <li
                          key={area}
                          className={
                            isHome
                              ? 'rounded-full border border-brand/50 bg-brand/20 px-3 py-1 text-xs font-semibold text-brand-light'
                              : 'rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-ink-100'
                          }
                        >
                          {area}
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="font-mono text-xs font-semibold tracking-widest text-ink-400 uppercase">
                    Follow our work
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {(
                      [
                        ['Yelp', social.yelp],
                        ['Facebook', social.facebook],
                        ['Instagram', social.instagram],
                      ] as const
                    ).map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-brand hover:text-brand-light"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </Container>
      </section>
    </>
  )
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/15">
        <Icon className="size-5 text-brand-light" aria-hidden />
      </div>
      <div>
        <dt className="text-xs font-medium tracking-wide text-ink-400 uppercase">
          {label}
        </dt>
        <dd className="mt-0.5">{children}</dd>
      </div>
    </div>
  )
}
