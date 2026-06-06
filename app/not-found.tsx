import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-950 px-6 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="select-none bg-gradient-to-b from-brand-light to-brand-dark bg-clip-text text-[9rem] font-extrabold leading-none tracking-tighter text-transparent sm:text-[14rem]">
          404
        </h1>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Page not found
        </h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-white/60">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
