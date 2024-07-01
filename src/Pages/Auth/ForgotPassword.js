import { useState } from 'react'
import Classes from '../../Components/Profile.module.css'

const ForgotPassword = () => {
    // const authCtx = useContext(AuthContext)
    const [email, setEmail] = useState(null)

    const changeHandler = (e) => {
        const { value } = e.target
        setEmail(value)
    }

    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBAv27yK2e9727TRSNUfn8_39wXJFexs1s', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({requestType:"PASSWORD_RESET", email})
            })
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            else if (response.ok) {
                const data = await response.json()
                console.log(data)
            }
        } catch (error) {
            console.log(error.message)
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
