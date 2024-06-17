import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Expense from './Pages/Expense/Expense';
import LogIn from './Pages/Auth/LogIn';
import SignUp from './Pages/Auth/SignUp';

function App() {
  return (
    <Switch>
      <Route path="/" exact><Redirect to="/login"/></Route>
      <Route path="/login"><LogIn/></Route>
      <Route path="/signup"><SignUp/></Route>
      <Route path="/expense"><Expense/></Route>
      <Route path="*"><Redirect to="/login"/></Route>
    </Switch>
  )
}

export default App;
