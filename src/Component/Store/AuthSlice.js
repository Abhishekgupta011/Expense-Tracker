import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
    isLogin: true,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
    setIsLogin(state , action){
      state.isLogin=action.payload;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
