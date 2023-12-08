import { Settings, Gauge, Activity, Wallet, MessageCircle } from 'lucide-react';
import { NavLink } from './NavLink';
import { Profile } from '../Profile';
import Image from 'next/image';

export function Sidebar() {
  return (
    <aside className="flex max-h-screen w-64 flex-col justify-between border-r bg-background px-4 py-8">
      <div>
        <Image
          src="/logo.png"
          alt="Chekker"
          draggable={false}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '80%',
            margin: '0 auto',
          }}
        />
        <div className="mt-10 text-gray-100">
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
            <li>
              <NavLink
                href="/feedbacks"
                title="Feedback"
                icon={MessageCircle}
              />
            </li>
          </ul>
        </div>
      </div>
      <Profile />
    </aside>
  );
}
