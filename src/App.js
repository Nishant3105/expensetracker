import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Expense from './Pages/Expense/Expense';
import LogIn from './Pages/Auth/LogIn';
import SignUp from './Pages/Auth/SignUp';
import { useContext } from 'react';
import AuthContext from './Contexts/AuthContext';

function App() {
  const authCtx=useContext(AuthContext)
  const {isLoggedIn}=authCtx
  return (
    <Switch>
      <Route path="/" exact><Redirect to="/login"/></Route>
      <Route path="/login"><LogIn/></Route>
      <Route path="/signup"><SignUp/></Route>
      {isLoggedIn && <Route path="/expense"><Expense/></Route>}
      {!isLoggedIn && <Route path="/expense"><Redirect to="/login"/></Route>}
      <Route path="*"><Redirect to="/login"/></Route>
    </Switch>
  )
}

export default App;
