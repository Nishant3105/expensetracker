import React, { useContext } from 'react'
import ExpenseContext from '../../Contexts/ExpenseContext'

const ExpenseDisplay = () => {
    const expenseCtx=useContext(ExpenseContext)
    const expenseData = expenseCtx.expenses.map((expense, index) => (
        <li key={index} id={index}>
            <span>Amount: {expense.amount}</span>
            <span>Description: {expense.description}</span>
            <span>Type of Expense: {expense.typeOfexpense}</span>
        </li>
    ))
    return (
        <div>
            <div>
                <ul>
                    {expenseData}
                </ul>
            </div>
        </div>
    )
}

export default ExpenseDisplay