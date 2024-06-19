import { useState, useContext } from 'react'
import Classes from '../../Components/Profile.module.css'
import AuthContext from '../../Contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const ForgotPassword = () => {
    const authCtx=useContext(AuthContext)
    const history=useHistory()
    const [email, setEmail] = useState(null)

    const changeHandler = (e) => {
        const {value } = e.target
        setEmail(value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const res=authCtx.authenticationAndUserManagement({requestType:"PASSWORD_RESET",email:`${email}`}, 3)
        if(res){
            history.push('/forgotpassword')
        }
    }
    return (
        <div className={Classes.container}>
            <form className={Classes.forminput}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={changeHandler} required></input>
                <button type="submit" onClick={submitHandler} className={Classes.button}>Login</button>
            </form>
        </div>
    )
}

export default ForgotPassword

// export default ForgotPassword