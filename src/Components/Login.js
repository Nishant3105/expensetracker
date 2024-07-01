import React, { useEffect,useState } from 'react'
import Classes from './Signup.module.css'
// import AuthContext from '../Contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios'
import {useDispatch} from 'react-redux'

import { authActions } from '../Store/AuthSlice';

const Login = () => {
    // const email=useSelector(state=>state.auth.email)
    // const token=useSelector(state=>state.auth.token)
    // const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)

    const dispatch=useDispatch()

    const history = useHistory()

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        const { id, value } = e.target
        setUserDetails(prevState => ({ ...prevState, [id]: value }))
    }

    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAv27yK2e9727TRSNUfn8_39wXJFexs1s', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...userDetails, returnSecureToken: true })
            })
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            else if (response.ok) {
                const data = await response.json()
                localStorage.setItem('token', data.idToken)
                localStorage.setItem('userdetails', JSON.stringify(data))
                dispatch(authActions.login({token:data.idToken}))
                history.push('/expense')
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>  
            <div className={Classes.container}>
                <form className={Classes.forminput}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={userDetails.email} onChange={changeHandler} required></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={userDetails.password} onChange={changeHandler} required></input>
                    <p><Link to="/forgotpassword">Forgot Password</Link></p>
                    <button type="submit" onClick={submitHandler} className={Classes.button}>Login</button>
                </form>
            </div>
            <div className={Classes.container}>
                <p>New User? Please click on <Link to="/signup">Sign Up</Link> to register.</p>
            </div>
        </>
    )
}

export default Login