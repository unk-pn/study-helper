import { CreateSubject } from "@/features/subjects/components/CreateSubject/CreateSubject";
import { SubjectsList } from "@/features/subjects/components/SubjectsList/SubjectsList";

const SubjectsPage = () => {
  return (
    <div>
      <CreateSubject />
      <SubjectsList />
    </div>
  );
};

export default SubjectsPage;
