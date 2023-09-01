import { LayoutDashboard, File, Settings, Gauge } from 'lucide-react';
import { NavLink } from './NavLink';

export function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-zinc-900 px-4 py-5">
      <h1 className="mt-3 pl-3 text-2xl">Logo</h1>
      <div className="mt-12 text-gray-100">
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink href="/" title="Dashboard" icon={LayoutDashboard} />
          </li>
          <li>
            <NavLink href="/pages" title="Páginas" icon={File} />
          </li>
          <li>
            <NavLink
              href="/performance-test"
              title="Teste de performance"
              icon={Gauge}
            />
          </li>
          <li>
            <NavLink href="/settings" title="Configurações" icon={Settings} />
          </li>
        </ul>
      </div>
    </aside>
  );
}
