import React from 'react'
import Login from '../../Components/Login'
import Theme from '../../Components/Theme'
import { useSelector } from 'react-redux'

const LogIn = () => {
  const isPremium=useSelector(state=>state.auth.isPremium)
  return (
    <>
    {isPremium && <Theme/>}
    <Login/>
    </>
  )
}

export default LogIn