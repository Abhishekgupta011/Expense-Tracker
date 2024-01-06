import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    products: [],
    total: 0,
    onEdited : false,
  },
  reducers: {
    initialExpenses(state , action){
        state.products = action.payload;
        
    },
    addExpense(state, action) {
      state.products.push(action.payload);
      state.total += Number(action.payload);
    },
    setEdited(state, action) {
      state.onEdited = action.payload;
  },
    editExpense(state, action) {
      const id = action.payload.updatedProducts.id;

      console.log("edit id " , id)
      
      const index = state.products.findIndex((expense) => expense.id === id);
      console.log(state.products[index])
      if (index!==-1) {
        state.total =
          +state.total -
          Number(state.products[index].amount) +
          Number(action.payload.amount);
        state.products[index] = action.payload;
      }
    },
    deleteExpense(state, action) {
      const idToDelete = action.payload;
      console.log("idtodelete" , idToDelete)
      state.products = state.products.filter((expense) =>{
        console.log('expenseid', expense._id)
        return expense._id !== idToDelete;
      } )
      state.total -= Number(state.products.find((expense) => expense._id === idToDelete)?.amount || 0);
    },
 
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
