import { CreateSubject, CreateSubjectModal, SubjectsList } from "@/features/subjects/components";
import c from "./page.module.css";

const SubjectsPage = () => {
  return (
    <div className={c.container}>
      {/* <CreateSubject /> */}
      <CreateSubjectModal />
      <SubjectsList />
    </div>
  );
};

export default SubjectsPage;
