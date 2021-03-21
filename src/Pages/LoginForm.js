import {Component,Link} from 'react';
import '../Pages/css/LoginPage.css'
import img from '../Pages/css/Design.png'
class LoginForm extends Component {

    render() {
        return (
            <div className="middle">
                 <div className="middle-left">
                     <img className="middle-img" src={img} alt="" />
                 </div>
            <div className="middle-right">
                <h1>Login</h1>
                <p>Welcome back, please login to your account.</p>
                <form className="user-info">
                    <label className="email" htmlFor="email">Email</label>
                    <input type="email" className="form-input" name="email" required/><br/>
                    <label className="password" htmlFor="password">Password</label><br/>
                 <input type="password" className="form-input" name="password" required/><br/>
                <input type="checkbox" className="checkbox-form" name="terms" value=""/>
                 <label htmlFor="terms"> Remember me</label>
                {/*<Link className="forgot-password" to="">Forgot Password?</Link><br/>*/}
               <button className="login-butt" type="button" name="button">Login</button>
                <button className="register-butt" type="button" name="button">Register</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default LoginForm;