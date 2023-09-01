import { DataTable } from '@/components/Table';
import { columns } from './columns';

const data = [
  {
    name: 'Protocolo gordura zero',
    url: 'https://protocologorduraz.online',
    status: 'up',
    id: '1231asf2eg',
  },
  {
    name: 'Protocolo estria morta',
    url: 'https://estriamorta.online',
    status: 'down',
    id: '9u8huh17',
  },
  {
    name: 'Coluna de ferro',
    url: 'https://colunadeferro.web',
    status: 'down',
    id: '7141gascyjd',
  },
];

export default function Pages() {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
