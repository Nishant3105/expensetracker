import { createSlice } from '@reduxjs/toolkit'

const initialState = { expenses: [],totalAmount: 0 }
const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addNewExpense(state, action) {
            state.expenses.push(action.payload)
        },
        updateExpense(state, action) {
            const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
            if (index !== -1) {
                state.expenses[index] = action.payload;
            }
        },
        deleteExpense(state, action) {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload) 
        },
        getExpenses(state, action) {
            state.expenses = action.payload
        }
    },
})


export const expenseActions = expenseSlice.actions

export default expenseSlice.reducer