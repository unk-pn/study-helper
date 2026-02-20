import { Subject } from "@/lib/schemas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubjectsState {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
}

const initialState: SubjectsState = {
  subjects: [],
  loading: false,
  error: null,
};

const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSubjects: (state, action: PayloadAction<Subject[]>) => {
      state.subjects = action.payload;
      state.loading = false;
      state.error = null;
    },
    addSubject: (state, action: PayloadAction<Subject>) => {
      state.subjects.unshift(action.payload);
    },
    updateSubject: (state, action: PayloadAction<Subject>) => {
      const index = state.subjects.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.subjects[index] = action.payload;
      }
    },
    changeSubjectQuestionCount: (
      state,
      action: PayloadAction<{ subjectId: string; count: number }>,
    ) => {
      const subjectIndex = state.subjects.findIndex(
        (s) => s.id === action.payload.subjectId,
      );
      if (subjectIndex !== -1)
        state.subjects[subjectIndex]._count.questions += action.payload.count;
    },
    deleteSubject: (state, action: PayloadAction<string>) => {
      state.subjects = state.subjects.filter((s) => s.id !== action.payload);
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
  setSubjects,
  addSubject,
  updateSubject,
  changeSubjectQuestionCount,
  deleteSubject,
  setLoading,
  setError,
} = subjectsSlice.actions;
export default subjectsSlice.reducer;
