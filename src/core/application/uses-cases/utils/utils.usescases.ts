export const getLastMonth = (): string => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');

  const lastMonth = `${year}-${month}`;
  return lastMonth;
};
