import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext({
    signup: () => { },
    token: null,
    email: null
})

export const AuthContextProvider = (props) => {
    const [userDetails, setUserDetails] = useState({
        email: '',
        token: ''
    })

    useEffect(() => {
        setUserDetails({
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token')
        })
    }, [])

    const signupHandler = async (usercreds) => {
        try {
            const { email, password } = usercreds
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAv27yK2e9727TRSNUfn8_39wXJFexs1s', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, returnSecureToken: true })
            })
            if (!response.ok) throw new Error('Something went wrong!')
            else if (response.ok) {
                const data = await response.json()
                localStorage.setItem('token', data.idToken)
                localStorage.setItem('email', data.email)
            }
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
    }
    const contextValues = {
        signup: signupHandler,
        token: userDetails.token,
        email: userDetails.email
    }
    return (
        <AuthContext.Provider value={contextValues}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext