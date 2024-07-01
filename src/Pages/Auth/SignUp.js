import React from 'react'
import Signup from '../../Components/Signup'
import Theme from '../../Components/Theme'
import { useSelector } from 'react-redux'

const SignUp = () => {
  const isPremium=useSelector(state=>state.auth.isPremium)
  return (
    <>
    {isPremium && <Theme/>}
    <Signup/>
    </>
  )
}

export default SignUp