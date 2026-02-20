export const formatDate = (date: string | Date | null): string | null => {
  if (!date) return null;

  let dateStr: string;
  if (date instanceof Date) {
    dateStr = date.toISOString();
  } else {
    dateStr = date;
  }

  const [year, month, day] = dateStr.split("T")[0].split("-");
  return `${day}.${month}.${year}`;
};
