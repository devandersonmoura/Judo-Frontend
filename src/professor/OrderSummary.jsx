import { useOptions } from '../options/OptionsContext.jsx';
import { BeltStrip } from '../ui/BeltStrip.jsx';

function count(registrations, belt, size) {
  return registrations.filter((item) => item.belt === belt && item.size === size).length;
}

export function OrderSummary({ registrations }) {
  const options = useOptions();
  const belts = options.belts.filter(({ value }) => registrations.some((item) => item.belt === value));
  const sizes = options.sizes.filter(({ value }) => registrations.some((item) => item.size === value));

  if (registrations.length === 0) {
    return (
      <section className="panel__section">
        <h2 className="panel__heading">Resumo para encomendar</h2>
        <p className="panel__empty">Nenhum pedido pendente.</p>
      </section>
    );
  }

  return (
    <section className="panel__section">
      <h2 className="panel__heading">Resumo para encomendar</h2>
      <p className="panel__empty">Conta só os pedidos pendentes.</p>
      <div className="table-scroll">
        <table className="table table--summary">
          <thead>
            <tr>
              <th scope="col">Faixa</th>
              {sizes.map(({ value, label, length }) => (
                <th key={value} scope="col" title={length}>
                  {label}
                </th>
              ))}
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {belts.map(({ value, label, color }) => (
              <tr key={value}>
                <th scope="row">
                  <span className="belt-label">
                    <BeltStrip color={color} className="belt-strip--small" />
                    {label}
                  </span>
                </th>
                {sizes.map((size) => (
                  <td key={size.value}>{count(registrations, value, size.value) || ''}</td>
                ))}
                <td className="table__total">
                  {registrations.filter((item) => item.belt === value).length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
