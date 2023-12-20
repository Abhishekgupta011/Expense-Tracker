import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState:{
        isDarkMode: true,
        isBrightMode: false,
    },
    reducers:{
        isDarkModeTrue(state) {
            state.isDarkMode = !state.isDarkMode;
          },
        isBrightModeTrue(state) {
            state.isBrightMode = !state.isBrightMode;
          },
    }
})

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;