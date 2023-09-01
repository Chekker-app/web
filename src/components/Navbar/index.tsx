import { Profile } from '../Profile';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-zinc-900 px-5 py-7">
      <h1 className="text-2xl font-medium text-zinc-50">Dashboard</h1>
      <Profile />
    </nav>
  );
}
