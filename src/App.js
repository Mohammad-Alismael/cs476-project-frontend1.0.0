
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
import Cart from "./Components/Cart";
import ProductManager from "./Pages/ProductManager";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import DeleteProduct from "./Pages/DeleteProduct";

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
                      {
                         sessionStorage.getItem("isLoggedIn") == "true" ?
                              (<LayoutDefault exact path="/profile-settings" component={ProfileSettings}/>) :
                              (<AreNotLoggedIn/>)

                      }
                      {
                          sessionStorage.getItem("isLoggedIn") == "true" ?
                              (<LayoutDefault exact path="/shopping-cart" component={ShoppingCart}/>) :
                              (<AreNotLoggedIn/>)

                      }

                      {
                          sessionStorage.getItem("isLoggedIn") == "true" &&
                          sessionStorage.getItem("userType") == "Product owner"?
                              (<LayoutDefault exact path="/product-owner-landing-page" component={ProductManager}/>) :
                              (<AreNotLoggedIn/>)

                      }
                      {
                          sessionStorage.getItem("isLoggedIn") == "true" &&
                          sessionStorage.getItem("userType") == "Product owner"?
                              (<LayoutDefault exact path="/product-owner-landing-page/add-products" component={AddProduct}/>) :
                              (<AreNotLoggedIn/>)

                      }
                      {
                          sessionStorage.getItem("isLoggedIn") == "true" &&
                          sessionStorage.getItem("userType") == "Product owner"?
                              (<LayoutDefault exact path="/product-owner-landing-page/edit-products" component={EditProduct}/>) :
                              (<AreNotLoggedIn/>)

                      }
                      {
                          sessionStorage.getItem("isLoggedIn") == "true" &&
                          sessionStorage.getItem("userType") == "Product owner"?
                              (<LayoutDefault exact path="/product-owner-landing-page/delete-products" component={DeleteProduct}/>) :
                              (<AreNotLoggedIn/>)

                      }
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
