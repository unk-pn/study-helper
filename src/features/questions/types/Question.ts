export interface Question {
  id: string;
  name: string;
  subjectId: string;
  answer: string | null;
  createdAt: Date;
  updatedAt: Date;
}
