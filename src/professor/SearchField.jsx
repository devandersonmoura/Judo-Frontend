export const normalizeText = (text) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

export function SearchField({ value, onChange }) {
  return (
    <input
      className="text-input search-field"
      id="order-search"
      type="search"
      placeholder="Buscar por nome"
      aria-label="Buscar pedido por nome"
      autoComplete="off"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
