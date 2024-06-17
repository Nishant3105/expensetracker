import React, { useContext, useState } from 'react'
import Profile from '../../Components/Profile'
import Classes from './Expense.module.css'
import AuthContext from '../../Contexts/AuthContext'

const Expense = () => {
    const authCtx=useContext(AuthContext)
    const [showProfileCompletition,setShowProfileCompletion]=useState(false)
    const [email,setEmail]=useState(null)

    const onCloseHandler=()=>{
        setShowProfileCompletion(prevState=>!prevState)
    }

    const sendEmailVerificationHandler=async ()=>{
        const res=await authCtx.sendEmailVerification()
        setEmail(res)
    }
    return (
        <>
            <div className={Classes.container}>
                <div className={Classes.left}>Welcome to Expense Tracker App!</div>
                {!showProfileCompletition && <div className={Classes.right}>Your Profile is incomplete! Please 
                    <b onClick={()=>setShowProfileCompletion(prevState=>!prevState)} style={{color: 'blueviolet'}}><u> Click Here!</u></b>
                </div>}
                {showProfileCompletition && <div className={Classes.right}>
                Please take a moment to complete your profile for a better personalized experience.
                </div>}
            </div>
            {showProfileCompletition && <Profile onClick={onCloseHandler}/>}
            <div className={Classes.container}>
                {!email && <button onClick={sendEmailVerificationHandler}>Verify Email</button>}
                {email && <p>Please check your email: {email} and click on the shared link!</p>}
            </div>
        </>
    )
}

export default Expense