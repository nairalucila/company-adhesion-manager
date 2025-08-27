export const getLastMonth = (): string => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1); //  = 06 julio para js

  const year = currentDate.getFullYear(); // 2025
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 7

  const lastMonth = `${year}-${month}`;
  return lastMonth;
};
