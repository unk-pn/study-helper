import { CreateSubject, SubjectsList } from "@/features/subjects/components";
import c from "./page.module.css";

const SubjectsPage = () => {
  return (
    <div className={c.container}>
      <CreateSubject />
      <SubjectsList />
    </div>
  );
};

export default SubjectsPage;
