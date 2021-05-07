import {Component,Link} from 'react';
import '../Pages/css/LoginPage.css'
import img from '../Pages/css/Design.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import {toast} from "react-toastify";
import {Card} from "reactstrap";

class LoginForm extends Component {
    state = {
        username: "",
        password: ""
    }
    nextPath(path) {
        this.props.history.push(path);
    }
    login = (e) =>{
        e.preventDefault()
        if (this.state.username != "" && this.state.password != ""){
            axios.post('https://localhost:5001/api/account/login',{
                "userName": this.state.username,
                "password": this.state.password
            }).then(res =>{
                sessionStorage.setItem("user_id", res.data.id);
                sessionStorage.setItem("username", res.data.userName);
                sessionStorage.setItem("email", res.data.email);
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("userType", res.data.userType);
                this.context.updateEmail(res.data.email);
                this.context.updateUserID(res.data.id);
                this.context.updateUsername(res.data.userName)
                this.context.updateIsLoggedIn(true);
                if (res.data.userType == "Customer"){
                    // console.log(res.data.id)
                    this.nextPath('/')
                    // console.log(sessionStorage.getItem("userType") == "Customer")
                }else if (res.data.userType == "Sales Manager"){
                    this.nextPath('/dashBoard')
                }else if (res.data.userType == "Product Manager"){
                    this.nextPath('/product-owner-landing-page')
                    // console.log(sessionStorage.getItem("userType") == "Product Manager",
                    //     sessionStorage.getItem("isLoggedIn") == "true")
                }else{
                    // console.log(res.data.id)
                    this.nextPath('/')
                    console.log(this.context.userID)
                }
            }).catch(error =>{
                if(error.response.status == 401)
                    toast.error("username or password are incorrect")
                    // alert("username or password is incorrect")

            })
        }else {
            toast.warn("check your info",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        console.log(this.state)
    }
    updateSate = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name] : e.target.value})
    }
    render() {
        return (
           <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 left">
                  <img className="middle-img" src={img} alt="" />
              </div>
          <div className="col-lg-4 col-md-4 col-sm-4 right" >
            <h1>Login</h1>
                    <form className="user-info">
                        <p className={"p-welcome"}>Welcome back, please login to your account.</p>
                        <label className="email" for="email">username</label><br/>
                        <input type="text" className="form-input" name="username" required onChange={this.updateSate}/><br/>
                        <label className="password" for="password">Password</label><br/>
                        <input type="password" className="form-input password-input" name="password" required onChange={this.updateSate}/><br/>
                        <input type={"checkbox"} class="checkbox-form" name="terms" value="t"/>
                        <label className="remember" htmlFor="terms"> Remember me</label>
                        <a className="forgot-password" href="/forgot-password">Forgot Password?</a><br/>
                        <button type="button" className="register" onClick={() => this.nextPath('/register')}>Register</button>
                        <button type="button" className="login" onClick={this.login}>log In</button>
              </form>
          </div>
        </div>
  </div>

        );
    }
}
LoginForm.contextType = GlobalContext
export default LoginForm;
