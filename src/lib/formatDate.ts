export const formatDate = (date: string | null) => {
  if (!date) return "Дата не указана";
  const [year, month, day] = date.split("T")[0].split("-");
  return `${day}.${month}.${year}`;
};
