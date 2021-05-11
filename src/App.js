
import {BrowserRouter as Router, Route,Redirect,Switch } from 'react-router-dom';
import LandingPage from "./Pages/LandingPage";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import ProfileSettings from "./Pages/ProfileSettings";
import GlobalContext,{GlobalProvider} from "./GlobalContext";
import ItemDetails from "./Pages/ItemDetails";
import LayoutDefault from "./Pages/LayoutDefault";
import CategoryPage from "./Pages/CategoryPage";
import AreNotLoggedIn from "./Pages/AreNotLoggedIn";
import ShoppingCart from "./Pages/ShoppingCart";
import ProductManager from "./Pages/ProductManager";
import AddProduct from "./Pages/AddProduct";
import DeleteProduct from "./Pages/DeleteProduct";
import DashBoard from "./Pages/DashBoard";
import FactorAuthentication from './Pages/FactorAuthentication'
import {ProtectedRoute} from "./protected.route";
import Checkout from "./Pages/Checkout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          <ToastContainer/>
          <Router>
              <div>
                  <Switch>
                      <LayoutDefault exact path="/" component={LandingPage}/>
                      <LayoutDefault exact path="/item-details/:item_id" component={ItemDetails} />
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
                      <Route exact path="/factor-authentication" component={FactorAuthentication} />
                      <Route exact path="/areNotLoggedIn" component={AreNotLoggedIn} />
                      <LayoutDefault>
                          <ProtectedRoute exact path="/profile-settings" component={ProfileSettings} userType={"all"} />
                          <ProtectedRoute exact path="/shopping-cart" component={ShoppingCart} userType={"all"} />
                          <ProtectedRoute exact path="/checkout" component={Checkout} userType={"all"} />
                          <ProtectedRoute exact path="/product-owner-landing-page" component={ProductManager} userType={"Product Manager"} />
                          <ProtectedRoute exact path="/product-owner-landing-page/add-products" component={AddProduct} userType={"Product Manager"} />
                          <ProtectedRoute exact path="/product-owner-landing-page/delete-products/:item_id" component={DeleteProduct} userType={"Product Manager"} />
                          <ProtectedRoute exact path="/product-owner-landing-page/delete-products" component={DeleteProduct} userType={"Product Manager"} />
                          <ProtectedRoute exact path="/dashBoard" component={DashBoard} userType={"Sales Manager"} />
                      </LayoutDefault>
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
