/* eslint-disable prettier/prettier */
'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, cloneElement } from 'react';
import { twMerge } from 'tailwind-merge';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  className: string;
}

export function ActiveLink({ children, className, ...rest }: ActiveLinkProps) {
  const path = usePathname();
  const isActive = path === rest.href;

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className: twMerge(
          className,
          isActive && 'bg-zinc-700 text-zinc-50',
        ),
      }) }
    </Link>
  );
}
