import React, { useState } from 'react'

const ExpenseContext=React.createContext({
    expenses: [],
    addToExpense: (expense)=>{}
})

export const ExpenseContextPrvider=(props)=>{
    const [expenses,setExpenses]=useState([])

    const addToExpenseHandler=(expense)=>{
        setExpenses([...expenses,expense])
    }

    const contextValues={
        expenses: [],
        addToExpense: addToExpenseHandler
    }
    return (
        <ExpenseContext.Provider value={contextValues}>
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContext