import React, { useState,useContext } from 'react'
import Classes from './Profile.module.css'
import Modal from '../Store/Modal'
import AuthContext from '../Contexts/AuthContext'

const Profile = (props) => {
    const authCtx=useContext(AuthContext)
    const [userDetails, setUserDetails] = useState({
        displayName: '',
        photoUrl: ''
    })

    const changeHandler=(e)=>{
        const {id,value}=e.target
        setUserDetails({...userDetails,[id]:value})
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        authCtx.authenticationAndUserManagement(userDetails, 2)
    }
    
    return (
        <Modal>
            <div className={Classes.container}>
                <div>
                    <button onClick={props.onClick}>Cancel</button>
                </div>
                <form className={Classes.forminput}>
                    <label htmlFor="displayName">Name:</label>
                    <input id="displayName" type="text" value={userDetails.displayName} onChange={changeHandler} required></input>
                    <label htmlFor="photoUrl">Profile Pic URL:</label>
                    <input id="photoUrl" type="text" value={userDetails.photoUrl} onChange={changeHandler} required></input>
                    <button type="submit" onClick={submitHandler}>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default Profile