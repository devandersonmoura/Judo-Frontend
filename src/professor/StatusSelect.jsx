import { useOptions } from '../options/OptionsContext.jsx';
import { Select } from '../ui/Select.jsx';

const renderDot = ({ value }) => <span className="status-dot" data-status={value} />;

export function StatusSelect({ name, value, onChange }) {
  const { statuses } = useOptions();

  return (
    <Select
      label={`Status do pedido de ${name}`}
      options={statuses}
      value={value}
      renderIcon={renderDot}
      onChange={onChange}
    />
  );
}
