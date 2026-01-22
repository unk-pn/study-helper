"use client";

import { Button, TextInput, Modal } from "@gravity-ui/uikit";
import { DatePicker } from "@gravity-ui/date-components";
import { useCreateSubject } from "../../hooks/useCreateSubject";
import c from "./CreateSubjectModal.module.css";
import { useTranslation } from "react-i18next";

export const CreateSubjectModal = () => {
  const {
    open,
    subjectName,
    setSubjectName,
    subjectDate,
    setSubjectDate,
    loading,
    error,
    inputRef,
    handleCreateSubject,
    handleOpenModal,
    handleCloseModal,
  } = useCreateSubject();
  const { t } = useTranslation();

  return (
    <div className={c.container}>
      <div className={c.header}>
        <h1 className={c.title}>{t("subjects.subjectsTitle")}</h1>
        <Button onClick={handleOpenModal} view="action" loading={loading}>
          {t("subjects.addSubject")}
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleCloseModal}
        contentClassName={c.modalContent}
        onTransitionInComplete={() => {
          inputRef.current?.focus();
        }}
      >
        <form className={c.form} onSubmit={(e) => handleCreateSubject(e)}>
          <h1 className={c.modalTitle}>{t("subjects.creatingSubject")}</h1>
          <TextInput
            size="l"
            placeholder={t("subjects.subjectName")}
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            validationState={error ? "invalid" : undefined}
            controlRef={inputRef}
            className={c.input}
            hasClear
          />
          <DatePicker
            size="l"
            value={subjectDate}
            onUpdate={setSubjectDate}
            format={"DD.MM.YYYY"}
            className={c.input}
            placeholder={t("subjects.date")}
          />
          <Button
            width="max"
            view="action"
            type="submit"
            disabled={loading || !subjectName}
          >
            {t("utils.add")}
          </Button>
        </form>
      </Modal>
    </div>
  );
};
