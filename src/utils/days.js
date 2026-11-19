export function getNumDays(start, end) {
  if (!start || !end) return null;

  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();

  return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
}
