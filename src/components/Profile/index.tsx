import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ProfileActions } from './components/ProfileActions';

export function Profile() {
  return (
    <div className="flex items-center gap-3 text-left">
      <Avatar>
        <AvatarImage src="https://github.com/fesilva-dev.png" />
        <AvatarFallback>FR</AvatarFallback>
      </Avatar>

      <div className="flex w-full items-center justify-between text-zinc-300">
        <p className="text-md leading-snug">Felipe Silva</p>
        <ProfileActions />
      </div>
    </div>
  );
}
