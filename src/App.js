import logo from './logo.svg';
// import './index.css';
import {BrowserRouter as Router, Route,Redirect,Switch } from 'react-router-dom';
import LandingPage from "./Pages/LandingPage";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import ProfileSettings from "./Pages/ProfileSettings";
import GlobalContext,{GlobalProvider} from "./GlobalContext";
import ItemDetails from "./Pages/ItemDetails";
import LayoutDefault from "./Pages/LayoutDefault";

function App() {
  return (
      <GlobalProvider>
          <Router>
              <div>
                  <Switch>
                      <LayoutDefault exact path="/" component={LandingPage}/>
                      <LayoutDefault exact path="/item-details/:item_id" component={ItemDetails} />
                      <Route exact path="/login" component={LoginForm}/>
                      <Route exact path="/register" component={RegisterForm} />
                      <Route exact path="/profile-settings" component={ProfileSettings}/>
                      <Route exact path="/log-out">
                      <Redirect to="/login"/>
                  </Route>
                  </Switch>
              </div>
          </Router>
      </GlobalProvider>

  );
}

export default App;
