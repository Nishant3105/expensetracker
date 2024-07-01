import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Expense from './Pages/Expense/Expense';
import LogIn from './Pages/Auth/LogIn';
import SignUp from './Pages/Auth/SignUp';
import { useSelector } from 'react-redux';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import { useEffect } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { authActions } from './Store/AuthSlice';

function App() {

  const dispatch=useDispatch()

  useEffect(() => {
    try {
      async function getUserInfo() {
        // const token = localStorage.getItem('token')
        // const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBAv27yK2e9727TRSNUfn8_39wXJFexs1s',
        //   { idToken: token }
        // )
        // dispatch(authActions.login({ token }))
      }
      getUserInfo()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  return (
    <Switch>
      <Route path="/" exact><Redirect to="/expense" /></Route>
      {!isLoggedIn && <Route path="/login"><LogIn /></Route>}
      {isLoggedIn && <Route path="/login"><Redirect to="/expense" /></Route>}
      {!isLoggedIn && <Route path="/signup"><SignUp /></Route>}
      {isLoggedIn && <Route path="/signup"><Redirect to="/expense" /></Route>}
      {isLoggedIn && <Route path="/expense"><Expense /></Route>}
      {!isLoggedIn && <Route path="/expense"><Redirect to="/login" /></Route>}
      {isLoggedIn && <Route path="/forgotpassword"><ForgotPassword /></Route>}
      <Route path="*"><Redirect to="/login" /></Route>
    </Switch>
  )
}

export default App;
