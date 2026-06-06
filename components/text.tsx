import { clsx } from 'clsx'
import type { ElementType, ComponentPropsWithoutRef } from 'react'

type TextProps = {
  className?: string
  as?: ElementType
  dark?: boolean
} & Omit<ComponentPropsWithoutRef<'h2'>, 'className'>

type SubheadingProps = TextProps & {
  /** Render a short leading colored rule before the eyebrow text. */
  rule?: boolean
  /** Render a small brand dot before the eyebrow text. */
  dot?: boolean
}

export function Heading({
  className,
  as: Element = 'h2',
  dark = false,
  ...props
}: TextProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'text-5xl font-medium tracking-tighter text-pretty text-ink-950 data-dark:text-white sm:text-6xl lg:text-7xl',
      )}
    />
  )
}

export function Subheading({
  className,
  as: Element = 'h2',
  dark = false,
  rule = false,
  dot = false,
  children,
  ...props
}: SubheadingProps) {
  const decorated = rule || dot
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        decorated && 'inline-flex items-center gap-2.5',
        'font-mono text-sm font-semibold tracking-widest text-brand uppercase data-dark:text-brand-light',
      )}
    >
      {rule ? (
        <span
          aria-hidden="true"
          className="h-px w-6 shrink-0 bg-brand data-dark:bg-brand-light"
          data-dark={dark ? 'true' : undefined}
        />
      ) : null}
      {dot ? (
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-accent"
        />
      ) : null}
      {children}
    </Element>
  )
}

export function Lead({
  className,
  ...props
}: { className?: string } & ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={clsx(className, 'text-lg leading-relaxed text-ink-700 sm:text-xl')}
      {...props}
    />
  )
}
