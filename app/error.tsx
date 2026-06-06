'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-950 px-6 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 flex size-20 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
          <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-white/60">
          An unexpected error occurred. Please try again or give us a call.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light sm:w-auto"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
