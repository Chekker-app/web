import { LinkProps } from 'next/link';
import { ElementType } from 'react';
import { ActiveLink } from './ActiveLink';

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  title: string;
}

export function NavLink({ title, icon: Icon, ...rest }: NavLinkProps) {
  return (
    <ActiveLink
      {...rest}
      className="flex items-center gap-2 rounded-xl p-3 py-4 text-sm hover:bg-zinc-700 hover:text-gray-50"
    >
      <div>
        <Icon size={22} />
        <span>{title}</span>
      </div>
    </ActiveLink>
  );
}
