export const urlDateFormatter = (date: Date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const calculateThreeMonthsAgo = (date: Date) => {
  date.setDate(date.getDate() - 90);

  return date;
};
