"use client"

import { Card } from "@gravity-ui/uikit";
import { SubjectsList, CreateSubjectModal } from "..";
import c from "./SubjectsPage.module.css";

export const SubjectsPage = () => {
  return (
    <Card className={c.card}>
      <CreateSubjectModal />
      <SubjectsList />
    </Card>
  );
};
