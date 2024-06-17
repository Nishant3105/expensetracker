import React, { useState, useContext } from 'react'
import Classes from './Signup.module.css'
import AuthContext from '../Contexts/AuthContext';
import { useHistory,Link } from 'react-router-dom';

const Login = () => {
    const authCtx=useContext(AuthContext)
    const history=useHistory()
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        const { id, value } = e.target
        setUserDetails(prevState => ({ ...prevState, [id]: value }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const res=authCtx.authenticationAndUserManagement(userDetails, 1)
        if(res){
            history.push('/expense')
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
                {/* {error && <p>{error}</p>} */}
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