import { useOptions } from '../options/OptionsContext.jsx';
import { BeltStrip } from '../ui/BeltStrip.jsx';
import { Select } from '../ui/Select.jsx';

const renderStrip = ({ color }) => <BeltStrip color={color} className="belt-strip--small" />;

export function BeltSelect({ name, value, onChange }) {
  const { belts } = useOptions();

  return (
    <Select
      label={`Faixa do pedido de ${name}`}
      options={belts}
      value={value}
      renderIcon={renderStrip}
      onChange={onChange}
    />
  );
}
