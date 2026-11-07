import { useState } from 'react';
import { useOptions } from '../options/OptionsContext.jsx';
import { TabPanel, Tabs } from '../ui/Tabs.jsx';
import { OrderSummary } from './OrderSummary.jsx';
import { RegistrationTable } from './RegistrationTable.jsx';
import { normalizeText, SearchField } from './SearchField.jsx';
import { ALL_STATUSES, StatusFilter } from './StatusFilter.jsx';

const TABS = [
  { value: 'pedidos', label: 'Pedidos' },
  { value: 'resumo', label: 'Resumo' },
];

export function Orders({ registrations, onRemove, onStatusChange }) {
  const { categories } = useOptions();
  const [tab, setTab] = useState('pedidos');
  const [filter, setFilter] = useState(ALL_STATUSES);
  const [search, setSearch] = useState('');

  const term = normalizeText(search);
  const visible = registrations.filter(
    (item) =>
      (filter === ALL_STATUSES || item.status === filter) &&
      normalizeText(item.name).includes(term),
  );

  return (
    <>
      <Tabs label="Seções do painel" tabs={TABS} value={tab} onChange={setTab} />

      {tab === 'pedidos' ? (
        <TabPanel value="pedidos">
          <div className="orders-toolbar">
            <SearchField value={search} onChange={setSearch} />
            <StatusFilter registrations={registrations} value={filter} onChange={setFilter} />
          </div>
          <div className="panel__tables">
            {categories.map(({ value, label }) => (
              <RegistrationTable
                key={`${value}-${filter}-${term}`}
                title={label === 'Adulto' ? 'Adultos' : label}
                registrations={visible.filter((item) => item.category === value)}
                onRemove={onRemove}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        </TabPanel>
      ) : (
        <TabPanel value="resumo">
          <OrderSummary registrations={registrations.filter((item) => item.status === 'pendente')} />
        </TabPanel>
      )}
    </>
  );
}
