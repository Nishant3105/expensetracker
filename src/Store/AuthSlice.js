import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token') || null //initial state
const isLoggedIn = !!localStorage.getItem('token')

const initialState = { isLoggedIn: isLoggedIn, token: token, isPremium: false }
const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login(state,action){
            state.token=action.payload.token
            state.isLoggedIn=true
        },
        logout(state){
            state.token=null
            state.isLoggedIn=false
        },
        activatePremium(state){
            state.isPremium=true
        }
    },
})


export const authActions=authSlice.actions

export default authSlice.reducer