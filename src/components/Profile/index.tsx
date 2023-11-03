'use client';

import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ProfileActions } from './components/ProfileActions';

export function Profile() {
  const { user } = useAuth();
  return (
    <div className="flex items-center gap-3 text-left">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback className="bg-gray-300">
          {user.shortName}
        </AvatarFallback>
      </Avatar>

      <div className="flex w-full items-center justify-between text-zinc-300">
        <p className="text-md leading-snug">{user.name}</p>
        <ProfileActions />
      </div>
    </div>
  );
}
