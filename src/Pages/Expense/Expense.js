import React from 'react'
import ExpenseDisplay from './ExpenseDisplay'
import ExpenseForm from './ExpenseForm'
import ExpenseHeader from './ExpenseHeader'
import Theme from '../../Components/Theme'
import { useSelector } from 'react-redux'


const Expense = () => {
    const isPremium=useSelector(state=>state.auth.isPremium)
    return (
        <>
            {isPremium && <Theme/>}
            
            <ExpenseHeader/>
          
            <ExpenseForm/>
        
            <ExpenseDisplay/>
        
        </>
    )
}

export default Expense