import { Settings, Gauge, Activity, Wallet } from 'lucide-react';
import { NavLink } from './NavLink';
import { Profile } from '../Profile';

export function Sidebar() {
  return (
    <aside className="flex max-h-screen w-64 flex-col justify-between border-r bg-background px-4 py-5">
      <div>
        <h1 className="mt-3 pl-3 text-2xl">Logo</h1>
        <div className="mt-12 text-gray-100">
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink href="/" title="Monitoramento" icon={Activity} />
            </li>
            <li>
              <NavLink
                href="/performance-test"
                title="Teste de performance"
                icon={Gauge}
              />
            </li>
            <li>
              <NavLink href="/settings/billing" title="Plano" icon={Wallet} />
            </li>
            <li>
              <NavLink
                href="/settings/geral"
                title="Configurações"
                icon={Settings}
              />
            </li>
          </ul>
        </div>
      </div>
      <Profile />
    </aside>
  );
}
