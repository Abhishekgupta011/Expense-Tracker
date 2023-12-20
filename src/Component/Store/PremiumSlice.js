import { createSlice } from "@reduxjs/toolkit";

const PremiumSlice = createSlice({
    name: 'premium',
    initialState: {
        activated: false,
        isDarkMode: false, 
        isBrightMode: true,
    },
    reducers: {
        activatePremium(state){
            state.activated=true;
        },
        
    }
});
export const PremiumAction = PremiumSlice.actions;
export default PremiumSlice.reducer;