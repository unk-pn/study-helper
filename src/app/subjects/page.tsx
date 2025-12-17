import { Subject } from "@/features/subjects/components/Subject/Subject";
import { mockSubjects } from "../../../mocks/mock-data";

const SubjectsPage = () => {
  return (
    <div>
      {mockSubjects.map((s) => (
        <Subject
          key={s.id}
          id={s.id}
          name={s.name}
          status={s.status}
          examDate={s.examDate}
        />
      ))}
    </div>
  );
};

export default SubjectsPage;
