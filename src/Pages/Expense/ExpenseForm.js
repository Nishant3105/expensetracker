import React, { useContext, useState } from 'react'
import FormClasses from '../../Components/Signup.module.css'
import ExpenseContext from '../../Contexts/ExpenseContext'


const ExpenseForm = () => {
    const expenseCtx=useContext(ExpenseContext)
    const [expenseDetails, setExpenseDetails] = useState({
        money: '',
        description: '',
        typeofexpense: 'food'
    })

    const changeHandler = (e) => {
        const { id, value } = e.target
        setExpenseDetails(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        expenseCtx.addToExpense(expenseDetails)
    }
    return (
        <>
        <div className={FormClasses.container}>
            <form className={FormClasses.forminput}>
                <label htmlFor="money">Amount:</label>
                <input id="money" type="number" value={expenseDetails.email} onChange={changeHandler} required></input>
                <label htmlFor="description">Description</label>
                <input id="description" type="text" value={expenseDetails.password} onChange={changeHandler} required></input>
                <label htmlFor="select">Type of Expense:</label>
                <select id="select" name="select" onChange={changeHandler}>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="shopping">Shopping</option>
                    <option value="rent">Rent</option>
                </select>
                <button type="submit" onClick={submitHandler} className={FormClasses.button}>Login</button>
            </form>
        </div>
        </>
    )
}

export default ExpenseForm