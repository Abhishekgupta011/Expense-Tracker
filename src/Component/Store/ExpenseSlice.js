import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    products: [],
  },
  reducers: {
    initialExpenses(state , action){
        state.products = action.payload;
    },
    addExpense(state, action) {
      state.products.push(action.payload);
    },
    
    editExpense(state, action) {
      const index = state.products.findIndex((expense) => expense.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteExpense(state, action) {
      state.products = state.products.filter((expense) => expense.id !== action.payload);
    },
 
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
