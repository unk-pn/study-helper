import { SubjectType } from "@/features/subjects/types/SubjectType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubjectsState {
  subjects: SubjectType[];
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
    setSubjects: (state, action: PayloadAction<SubjectType[]>) => {
      state.subjects = action.payload;
      state.loading = false;
      state.error = null;
    },
    addSubject: (state, action: PayloadAction<SubjectType>) => {
      state.subjects.unshift(action.payload);
    },
    updateSubject: (state, action: PayloadAction<SubjectType>) => {
      const index = state.subjects.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.subjects[index] = action.payload;
      }
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
  deleteSubject,
  setLoading,
  setError,
} = subjectsSlice.actions;
export default subjectsSlice.reducer;
