import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Profile() {
  return (
    <div className="flex items-center gap-3 text-left">
      <Avatar>
        <AvatarImage src="https://github.com/fesilva-dev.png" />
        <AvatarFallback>FR</AvatarFallback>
      </Avatar>

      <div className="flex flex-col text-zinc-300">
        <p className="text-md leading-snug">Felipe Silva</p>
        <a
          href="/api/auth/logout"
          className="text-xs text-red-400 hover:text-red-500"
        >
          Sair
        </a>
      </div>
    </div>
  );
}
