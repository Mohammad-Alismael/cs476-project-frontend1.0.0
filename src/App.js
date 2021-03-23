import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,Redirect,Switch } from 'react-router-dom';
import LandingPage from "./Pages/LandingPage";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import ProfileSettings from "./Pages/ProfileSettings";
import ForgotPassword from "./Pages/ForgotPassword";
function App() {
  return (
      <Router>
          <div>
              <Switch>
                  <Route exact path="/" component={LandingPage}/>
                  <Route exact path="/login" component={LoginForm}/>
                  <Route exact path="/register" component={RegisterForm} />
                  <Route exac path="/forgot-password" component={ForgotPassword} />
                  <Route exact path="/profile-settings" component={ProfileSettings}/>
                  <Route exact path="/log-out">
                  <Redirect to="/login"/>
              </Route>
              </Switch>
          </div>
      </Router>


  );
}

export default App;
