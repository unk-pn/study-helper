"use client";

import { Button, Modal } from "@gravity-ui/uikit";
import { useCreateSubject } from "../../hooks/useCreateSubject";
import c from "./CreateSubjectModal.module.css";
import { FormDatePicker, FormTextInput } from "@/components";

export const CreateSubjectModal = () => {
  const {
    t,
    open,
    form,
    inputRef,
    handleCreateSubject,
    handleOpenModal,
    handleCloseModal,
  } = useCreateSubject();

  return (
    <div className={c.container}>
      <div className={c.header}>
        <h1 className={c.title}>{t("subjects.subjectsTitle")}</h1>
        <Button onClick={handleOpenModal} view="action">
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
        disableBodyScrollLock={false}
      >
        <form className={c.form} onSubmit={handleCreateSubject}>
          <h1 className={c.modalTitle}>{t("subjects.creatingSubject")}</h1>
          <FormTextInput
            name="name"
            control={form.control}
            size="l"
            placeholder={t("subjects.subjectName")}
            controlRef={inputRef}
            className={c.input}
            hasClear
          />
          <FormDatePicker
            name="date"
            control={form.control}
            size="l"
            format={"DD.MM.YYYY"}
            placeholder={t("subjects.date")}
            className={c.input}
          />
          <Button
            width="max"
            view="action"
            type="submit"
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
          >
            {t("utils.add")}
          </Button>
        </form>
      </Modal>
    </div>
  );
};
