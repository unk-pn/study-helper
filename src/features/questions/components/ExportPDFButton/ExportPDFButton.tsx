import { useAppSelector } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { Button } from "@gravity-ui/uikit";
import { useTranslation } from "react-i18next";

interface ExportPDFButtonProps {
  subjectId: string;
}

export const ExportPDFButton = ({ subjectId }: ExportPDFButtonProps) => {
  const subject = useAppSelector((s) =>
    s.subjects.subjects.find((subj) => subj.id === subjectId),
  );
  const { t } = useTranslation();
  const { execute } = useApi<Blob>("/api/export-pdf", {
    refetchOnMount: false,
    responseType: "blob",
  });

  if (!subject) return

  const handleExport = async () => {
    const data = await execute({
      method: "POST",
      body: {
        subjectId,
      },
    });

    if (data) {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${t("pdf.name", {name: subject.name})}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  return (
    <Button onClick={handleExport} size="l">
      {t("questions.exportPDF")}
    </Button>
  );
};
