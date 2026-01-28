import i18n from "@/i18n/config";

export const formatDate = (date: string | null) => {
  // if (!date) return i18n.t("subjects.noDate");
  if (!date) return null;
  const [year, month, day] = date.split("T")[0].split("-");
  return `${day}.${month}.${year}`;
};
