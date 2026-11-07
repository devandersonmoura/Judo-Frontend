const formatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Sao_Paulo',
});

export const formatDateTime = (date) => formatter.format(new Date(date)).replace(',', ' às');
