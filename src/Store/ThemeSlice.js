import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: 'light' }
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload;
          },
          resetTheme(state) {
            state.theme = 'light';
          },
    }
})

export const themeActions = themeSlice.actions

export default themeSlice.reducer