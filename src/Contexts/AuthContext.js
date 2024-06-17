import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext({
    authenticationAndUserManagement: () => { },
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

    const authenticationAndUserManagementHandler = async (usercreds, code) => {
        try {
            let url
            let reqBody
            switch (code) {
                case 0:
                    url = 'signUp'
                    break;
                case 1:
                    url = 'signInWithPassword'
                    break;
                case 2:
                    url = 'update'
                    break;
            }
            if(code===0 || code===1){
                let { email, password } = usercreds
                reqBody={ email, password, returnSecureToken: true }
            }
            else if(code===2){
                let { displayName, photoUrl } = usercreds
                let id_token=localStorage.getItem('token')
                reqBody={ idToken: id_token, displayName, photoUrl, returnSecureToken: true }
            }
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${url}?key=AIzaSyBAv27yK2e9727TRSNUfn8_39wXJFexs1s`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            })
            if (!response.ok) throw new Error('Something went wrong!')
            else if (response.ok) {
                const data = await response.json()
                if (code===0 || code===1) {
                    localStorage.setItem('token', data.idToken)
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('userdetails',JSON.stringify(data))
                    return true
                }
            }
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
    }

    const contextValues = {
        authenticationAndUserManagement: authenticationAndUserManagementHandler,
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