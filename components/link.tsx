import * as Headless from '@headlessui/react'
import NextLink from 'next/link'
import { ComponentProps, forwardRef } from 'react'

type LinkProps = ComponentProps<typeof NextLink>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  return (
    <Headless.DataInteractive>
      <NextLink ref={ref} {...props} />
    </Headless.DataInteractive>
  )
})

Link.displayName = 'Link'
