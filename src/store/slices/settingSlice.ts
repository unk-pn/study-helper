import { createSlice } from "@reduxjs/toolkit";

interface SettingState {
  theme: "light" | "dark";
  language: "ru" | "en";
}

const initialState: SettingState = {
  theme: "light",
  language: "ru",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
