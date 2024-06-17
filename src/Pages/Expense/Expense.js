import React, { useState } from 'react'
import Profile from '../../Components/Profile'
import Classes from './Expense.module.css'

const Expense = () => {
    const [showProfileCompletition,setShowProfileCompletion]=useState(false)

    const onCloseHandler=()=>{
        setShowProfileCompletion(prevState=>!prevState)
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
            {/* <div className={Classes.horizontalline}></div> */}
            {showProfileCompletition && <Profile onClick={onCloseHandler}/>}
        </>
    )
}

export default Expense