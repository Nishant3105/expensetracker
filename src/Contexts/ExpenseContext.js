import React, { useCallback, useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from '../firebase/firebase'
import { getWebsites } from "../firebase/api";
import axios from 'axios'

const ExpenseContext = React.createContext({
    expenses: [],
    addToExpense: (expense) => { },
    editExpense: () => { },
    deleteExpense: () => { }
})

export const ExpenseContextPrvider = (props) => {
    const [expenses, setExpenses] = useState([])
    console.log(expenses)
    const getExpenses = async () => {
        try {
            const response = await axios.get('https://expensetracker-57345-default-rtdb.firebaseio.com/expenses.json')
            if (response.status === 200) {
                const data = Object.entries(response.data).map(([id, details]) => ({
                    id,
                    ...details
                }))
                console.log(data)
                // const data = Object.entries(response.data)
                // let arr=[]

                // setExpenses([{description: obj[0].description}])
                setExpenses(data)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getExpenses()
    }, [])

    // useEffect(() => {
    //     const fetchExpenses = async() => {
    //             const querySnapshot = await getWebsites();
    //             // onGetLinks((querySnapshot) => {
    //             const docs = [];
    //             querySnapshot.forEach((doc) => {
    //               docs.push({ ...doc.data(), id: doc.id });
    //             });
    //             console.log('docs..',docs)
    //             setExpenses(docs);
    //             // });        
    //     }
    //     fetchExpenses();
    //   }, []);

    const addToExpenseHandler = async (expense) => {
        try {
            const response = await axios.post('https://expensetracker-57345-default-rtdb.firebaseio.com/expenses.json',
                expense
            )
            setExpenses([...expenses, expense])
        } catch (error) {
            console.log(error.message)
        }
    }
    const editExpenseHandler = async (id, updatedData) => {
        try {
            const response = await axios.put(`https://expensetracker-57345-default-rtdb.firebaseio.com/expenses/${id}.json`,
                updatedData
            )
            const updateExpense=expenses.filter((expense)=>expense.id!==id? expense:{id,...updatedData})
            setExpenses(updateExpense)
            alert('Your expense got updated!')
            console.log('Your expense got updated!')

        } catch (error) {
            console.log(error.message)
        }
    }
    const deleteExpenseHandler = async (id) => {
        try {
            const response = await axios.delete(`https://expensetracker-57345-default-rtdb.firebaseio.com/expenses/${id}.json`)

            const updateExpense=expenses.filter((expense)=>expense.id!==id)
            setExpenses(updateExpense)
            alert('Your expense got deleted!')
            console.log('Your expense got deleted!')

        } catch (error) {
            console.log(error.message)
        }
    }

    const contextValues = {
        expenses,
        addToExpense: addToExpenseHandler,
        editExpense: editExpenseHandler,
        deleteExpense: deleteExpenseHandler
    }
    return (
        <ExpenseContext.Provider value={contextValues}>
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContext