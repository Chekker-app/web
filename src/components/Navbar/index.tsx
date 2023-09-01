import { Profile } from '../Profile';
import { ActivePage } from './ActivePage';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-zinc-900 px-5 py-7">
      <ActivePage />
      <Profile />
    </nav>
  );
}
