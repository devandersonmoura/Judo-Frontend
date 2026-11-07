// Evita abrir a confirmação com campo faltando. Quem decide de verdade é a API.
export function validateEntry({ category, name, belt, size }) {
  const errors = {};
  if (!category) errors.category = 'Escolha adulto ou infantil.';
  if (name.trim().length < 2) errors.name = 'Escreva o nome completo.';
  if (!belt) errors.belt = 'Escolha a cor da faixa.';
  if (!size) errors.size = 'Escolha o tamanho da faixa.';
  return errors;
}
