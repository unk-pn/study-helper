import { QuestionType } from "@/features/questions/types/QuestionType";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

interface QuestionsPDFProps {
  questions: QuestionType[];
  subjectName: string;
}

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  question: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  questionText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  answer: {
    fontSize: 12,
    color: "#666",
  },
});

export const QuestionsPDF = ({ questions, subjectName }: QuestionsPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{subjectName}</Text>

        {questions.map((q, index) => (
          <View key={q.id} style={styles.question}>
            <Text style={styles.questionText}>
              {index + 1}. {q.name}
            </Text>
            <Text style={styles.answer}>{q.answer}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};
