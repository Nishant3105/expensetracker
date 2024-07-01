import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Profile from '../../Components/Profile'
import Classes from './ExpenseHeader.module.css'
import { authActions } from '../../Store/AuthSlice'
import { themeActions } from '../../Store/ThemeSlice'
import { expenseActions } from '../../Store/ExpenseSlice'
import CsvDownloader from 'react-csv-downloader';

import { useSelector, useDispatch } from 'react-redux'
import Theme from '../../Components/Theme'

const ExpenseHeader = () => {
    const [showProfileCompletition, setShowProfileCompletion] = useState(false)
    const [email, setEmail] = useState(null)

    const theme = useSelector((state) => state.theme.theme)
    const expenses = useSelector((state) => state.expense.expenses)
    const isPremium = useSelector((state) => state.auth.isPremium)

    const dispatch = useDispatch()

    const getExpenses = async () => {
        try {
            const response = await axios.get('https://expensetracker-57345-default-rtdb.firebaseio.com/expenses.json')
            if (response.status === 200) {
                let total = 0
                const data = Object.entries(response.data).map(([id, details]) => ({
                        id,
                        ...details
                    })
                )
                dispatch(expenseActions.getExpenses(data))
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getExpenses()
    }, [])


    const onCloseHandler = () => {
        setShowProfileCompletion(prevState => !prevState)
    }

    const sendEmailVerificationHandler = async () => {
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBAv27yK2e9727TRSNUfn8_39wXJFexs1s', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ requestType: "VERIFY_EMAIL", idToken: localStorage.getItem('token') })
            })
            if (!response.ok) {
                const err = await response.json()
                throw new Error(err.error.errors[0].message)
            }
            if (response.ok) {
                const data = await response.json()
                setEmail(data.email)
            }

        } catch (error) {
            alert(error)
        }
    }
    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(authActions.logout())
    }

    const Columns = [
        { id: 'money', displayName: 'Amount' },
        { id: 'description', displayName: 'Description' },
        { id: 'typeofexpense', displayName: 'Type Of Expense' }]

    return (
        <>
          <header className={`${theme === 'light' ? Classes.light : Classes.darktheme}`}> 
               <div >Welcome to Expense Tracker App!</div>
                {!showProfileCompletition && <div > Your Profile is incomplete! Please
                    <button onClick={() => setShowProfileCompletion(prevState => !prevState)}>Click Here!</button>
                </div>}
                {showProfileCompletition && <div>
                    Please take a moment to complete your profile for a better personalized experience.
                    {!email && <button onClick={sendEmailVerificationHandler}>Verify Email</button>}
                    {email && <p>Please check your email: {email} and click on the shared link!</p>}
                </div>}
                {showProfileCompletition && <Profile onClick={onCloseHandler} />}
                <div>
                    <button onClick={logoutHandler}>Logout</button>
                </div>
                <div>
                     {isPremium && <CsvDownloader
                        filename="myfile"
                        extension=".csv"
                        separator=";"
                        wrapColumnChar="'"
                        columns={Columns}
                        datas={expenses}
                        text="DOWNLOAD" />}
                </div> 
            </header>
        </>
    )
}

export default ExpenseHeader