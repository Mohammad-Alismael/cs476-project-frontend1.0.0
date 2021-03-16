import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import LandingPage from "./Pages/LandingPage";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import ProfileSettings from "./Pages/ProfileSettings";
function App() {
  return (
      <Router>
        {/* <Route path="/">
          <Redirect to="/login"/>
        </Route> */}
        {/*<Route  path="/login" render= {props =>(*/}
        {/*    <>*/}
        {/*      <LoginForm/>*/}
        {/*    </>*/}

        {/*)}/>*/}
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/" component={LandingPage} />
        <Route path="/profile-settings" component={ProfileSettings} />
        <Route path="/log-out">
          <Redirect to="/login" />
        </Route>
      </Router>


  );
}

export default App;
