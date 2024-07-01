import React, { useContext, useEffect, useState } from 'react'
import FormClasses from './ExpenseForm.module.css'
import ExpenseContext from '../../Contexts/ExpenseContext'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../../Store/AuthSlice'
import { expenseActions } from '../../Store/ExpenseSlice'
import axios from 'axios'


const ExpenseForm = () => {
    const expenses=useSelector(state=>state.expense.expenses)

    const [activatePremium,setActivatePremium]=useState(false)
    const isPremium=useSelector(state=>state.auth.isPremium)
    const dispatch = useDispatch()
    const [expenseDetails, setExpenseDetails] = useState({
        money: '',
        description: '',
        typeofexpense: ''
    })


    const changeHandler = (e) => {
        const { id, value } = e.target
        setExpenseDetails(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post('https://expensetracker-57345-default-rtdb.firebaseio.com/expenses.json', expenseDetails)
            console.log(response.data)
            dispatch(expenseActions.addNewExpense({...expenseDetails,id: response.data.name}))
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        let total=0
        expenses.forEach((expense)=>{
            total += Number(expense.money)
        })
        console.log('total amount',total)
        if(total>=10000){
            console.log('entered total if',total)
            setActivatePremium(true)
        } 
    },[expenses])

    const premiumHandler=()=>{
        dispatch(authActions.activatePremium())
        
    }
    return (
        <>
                <form className={FormClasses.forminput}>
                    <label htmlFor="money">Amount:</label>
                    <input id="money" type="number" value={expenseDetails.money} onChange={changeHandler} required></input>
                    <label htmlFor="description">Description</label>
                    <input id="description" type="text" value={expenseDetails.description} onChange={changeHandler} required></input>
                    <label htmlFor="select">Type of Expense:</label>
                    <select id="typeofexpense" name="select" value={expenseDetails.typeofexpense} onChange={changeHandler}>
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="shopping">Shopping</option>
                        <option value="rent">Rent</option>
                    </select>
                    <button type="submit" onClick={submitHandler} >Add</button>
                    {!isPremium && activatePremium && <button onClick={premiumHandler}>Activate Premium</button>}
                </form>
        </>
    )
}

export default ExpenseForm