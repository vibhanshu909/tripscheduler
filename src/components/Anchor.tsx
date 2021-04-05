import Link, { LinkProps } from 'next/link'
import React from 'react'

interface IAnchorProps
  extends Omit<
    React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    'href'
  > {
  //* This prop is required.
  href: LinkProps['href']

  //* The ? makes this prop optional, or not required
  as?: LinkProps['as']
  passHref?: LinkProps['passHref']

  //* This prop is used to check and skip the `a` tag when a custom `a` tag is passed as children.
  skipATag?: boolean
}

//* The forwardRef function forwards the ref passed by the parent component to this component.
const Anchor = React.forwardRef<any, IAnchorProps>((props, ref) => {
  const { href, as = href, passHref = false, skipATag = false, ...restProps } = props
  const { children } = restProps
  return (
    <Link href={href} as={as} passHref={passHref}>
      {skipATag ? (
        children
      ) : (
        <a {...restProps} ref={ref}>
          {children}
        </a>
      )}
    </Link>
  )
})

export default Anchor
