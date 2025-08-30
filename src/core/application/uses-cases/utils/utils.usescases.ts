/**
 * This function return the last month.
 *
 * @return {*}  {string}
 */
export const getLastMonth = (): string => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');

  const lastMonth = `${year}-${month}`;
  return lastMonth;
};

/**
 * This function generate a random id to simulate once.
 *
 * @return {*}  {string}
 */
export const generateId = (): string => {
  const id = Math.floor(Math.random() * (100 - 1 + 1)).toString();
  return id;
};
