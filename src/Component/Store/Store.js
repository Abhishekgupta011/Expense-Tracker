import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice'
import expenseReducer from './ExpenseSlice'
import premiumReducer from './PremiumSlice';
import themeReducer from './ThemeSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    premium: premiumReducer,
    theme: themeReducer,
  },
});

export default store;
