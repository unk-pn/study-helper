import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "../../features/questions/types/QuestionType";

interface QuestionState {
  questions: QuestionType[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuestionType[]>) => {
      state.questions = action.payload;
      state.loading = false;
      state.error = null;
    },
    addQuestion: (state, action: PayloadAction<QuestionType>) => {
      state.questions.unshift(action.payload);
    },
    updateQuestion: (state, action: PayloadAction<QuestionType>) => {
      const index = state.questions.findIndex(
        (s) => s.id === action.payload.id
      );

      if (index !== -1) {
        state.questions[index] = action.payload;
      }
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter((s) => s.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setLoading,
  setError,
} = questionsSlice.actions;
export default questionsSlice.reducer;
