import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type LinkProps = PropsWithChildren<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href?: string | URL }
>;

export default function Link({ href, children, ...rest }: LinkProps) {
  const normalizedHref =
    typeof href === "string" || typeof href === "undefined" ? href : href.toString();

  return (
    <a href={normalizedHref} {...rest}>
      {children}
    </a>
  );
}
