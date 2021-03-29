import {Component,Link} from 'react';
import '../Pages/css/LoginPage.css'
import img from '../Pages/css/Design.png'
import 'bootstrap/dist/css/bootstrap.min.css';
class LoginForm extends Component {
    nextPath(path) {
        this.props.history.push(path);
    }
    render() {
        return (
           <div class="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 left">
                  <img className="middle-img" src={img} alt="" />
              </div>
          <div className="col-lg-4 col-md-4 col-sm-4 right">
            <h1>Login</h1>
                    <form className="user-info">
                        <p className={"p-welcome"}>Welcome back, please login to your account.</p>
                        <label className="email" for="email">Email</label><br/>
                        <input type="email" className="form-input" name="email" required/><br/>
                        <label className="password" for="password">Password</label><br/>
                        <input type="password" className="form-input password-input" name="password" required/><br/>
                        <input type={"checkbox"} class="checkbox-form" name="terms" value="t"/>
                        <label className="remember" htmlFor="terms"> Remember me</label>
                        <a className="forgot-password" href="/forgot-password">Forgot Password?</a><br/>
                        <button type="button" className="register" onClick={() => this.nextPath('/register')}>Register</button>
                        <button type="button" className="login">log In</button>
              </form>
          </div>
        </div>
  </div>

        );
    }
}

export default LoginForm;
