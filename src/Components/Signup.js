import React, { useState,useContext } from 'react'
import AuthContext from '../Contexts/AuthContext';
import Classes from './Signup.module.css'
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom';

const Signup = () => {
    const authCtx=useContext(AuthContext)
    const history=useHistory()
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        confirmpassword: ''
    })

    const changeHandler=(e)=>{
            const {id,value}=e.target
            setUserDetails(prevState=>({...prevState, [id]:value}))
            if(userDetails.password === userDetails.confirmpassword){
                setError('')
            }

            if (id === 'password') {
                validatePasswordStrength(value);
            }
    
            if (id === 'confirmpassword') {
                checkPasswordMatch(userDetails.password, value);
            }

    }

    const validatePasswordStrength = (password) => {
        if (password.length < 6) {
            setPasswordStrength('Weak password');
        } else if (password.length >= 6 && password.length < 10) {
            setPasswordStrength('Medium strength password');
        } else {
            setPasswordStrength('Strong password');
        }
    };

    const checkPasswordMatch = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
        } else {
            setError('');
        }
    };

    const submitHandler = (e) => {
        try{
            e.preventDefault()
            if(userDetails.password !== userDetails.confirmpassword){
                setError('passwords do not match!')
                return
            }
            // else if(userDetails.email === "" || userDetails.password === "" || userDetails.)
                const res=authCtx.signupNlogin(userDetails, false)
            if(res){
                history.push('/login')
            }
            
        }catch(error){
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
                {passwordStrength && <p className="password-strength">{passwordStrength}</p>}
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input id="confirmpassword" type="password" value={userDetails.confirmpassword} onChange={changeHandler} required></input>
                {error && <p>{error}</p>}
                <button type="submit" onClick={submitHandler} className={Classes.button}>Register</button>
            </form>
        </div>
        <div className={Classes.container}>
            <p>Already a User? <Link to="/login">Login</Link></p>
        </div>
        </>
    );
}

export default Signup