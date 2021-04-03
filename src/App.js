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
import CategoryPage from "./Pages/CategoryPage";

function App() {
    const routes = [
        {
            path : "/computers/gpu",
            category : 2
        },
        {
            path : "/computers/cpu",
            category : 1
        },
        {
            path : "/computers/motherboards",
            category : 3
        },
        {
            path : "/computers/apple",
            category : 4
        },
        {
            path : "/computers/monitors",
            category : 5
        }
    ]
  return (
      <GlobalProvider>
          <Router>
              <div>
                  <Switch>
                      <LayoutDefault exact path="/" component={LandingPage}/>
                      <LayoutDefault exact path="/item-details/:item_id" component={ItemDetails} />
                      <LayoutDefault exact path="/computers/gpu" render={(props)=>
                          <CategoryPage {...props} category={2}/>}
                      />
                      <LayoutDefault exact path="/computers/cpu" render={(props)=>
                          <CategoryPage {...props} category={1}/>}
                      />
                      {
                          routes.map(({path,category})=>{
                              return(
                                  <LayoutDefault exact path={path} render={(props)=>
                                      <CategoryPage {...props} category={category}/>}
                                  />
                              )
                          })
                      }
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
