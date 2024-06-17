import React, { useState, useContext, useEffect, useCallback } from 'react'
import Classes from './Profile.module.css'
import Modal from '../Store/Modal'
import AuthContext from '../Contexts/AuthContext'

const Profile = (props) => {
    const authCtx = useContext(AuthContext)
    
    const [userDetails, setUserDetails] = useState({
        displayName: '',
        photoUrl: ''
    })

    const getUserData = useCallback(async () => {
        try {
            const reqBody={idToken: localStorage.getItem('token')}
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBAv27yK2e9727TRSNUfn8_39wXJFexs1s', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            })
            if (!response.ok) throw new Error('Something went wrong!')
            else if (response.ok) {
                const data = await response.json()
                const DisplayName=data.users[0].providerUserInfo[0].displayName
                const PhotoUrl=data.users[0].providerUserInfo[0].photoUrl
                if(DisplayName && PhotoUrl){
                    setUserDetails({ displayName: DisplayName, photoUrl: PhotoUrl })
                }
                else if(DisplayName){
                    setUserDetails({ displayName: DisplayName, photoUrl: "" })
                }
                else if(PhotoUrl){
                    setUserDetails({ displayName: "", photoUrl: PhotoUrl })
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    },[])

    useEffect(() => {
        getUserData()
    }, [getUserData])


    const changeHandler = (e) => {
        const { id, value } = e.target
        setUserDetails({ ...userDetails, [id]: value })
    }

    const submitHandler = (e) => {
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