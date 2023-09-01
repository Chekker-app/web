import { LayoutDashboard, File, Settings, Gauge } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-zinc-900 px-4 py-5">
      <h1 className="mt-3 pl-3 text-2xl">Logo</h1>
      <div className="mt-12 text-gray-100">
        <ul className="flex flex-col gap-4">
          <li>
            <a
              href="/"
              className="flex cursor-pointer items-center gap-2 rounded-xl p-3 py-4 text-sm hover:bg-zinc-700 hover:text-gray-50"
            >
              <LayoutDashboard size={22} />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/pages"
              className="flex cursor-pointer items-center gap-2 rounded-xl p-3 py-4 text-sm hover:bg-zinc-700 hover:text-gray-50"
            >
              <File size={22} />
              Páginas
            </a>
          </li>
          <li>
            <a
              href="/performance-test"
              className="flex cursor-pointer items-center gap-2 rounded-xl p-3 py-4 text-sm hover:bg-zinc-700 hover:text-gray-50"
            >
              <Gauge size={22} />
              Teste de performance
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="flex cursor-pointer items-center gap-2 rounded-xl p-3 py-4 text-sm hover:bg-zinc-700 hover:text-gray-50"
            >
              <Settings size={22} />
              Configurações
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
