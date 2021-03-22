import {Component,Link} from 'react';
import '../Pages/css/LoginPage.css'
import img from '../Pages/css/Design.png'
class LoginForm extends Component {

    render() {
        return (
           <div class="container-fluid">

    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6 left" style="">
                     <img className="middle-img" src={img} alt="" />
                   </div>
      <div class="col-lg-4 col-md-4 col-sm-4 right" style="">
        <h1>Login</h1>
                <p>Welcome back, please login to your account.</p>
                <form className="user-info">
                     <p class="p-welcome">Welcome back, please login to your account.</p>
        <form class="user-info" action="index.html" method="post">
          <label class="email" for="email">Email</label><br>
          <input type="email" class="form-input" name="email" required><br>
          <label class="password" for="password">Password</label><br>
          <input type="password" class="form-input password-input" name="password" required><br>
          <input type="checkbox" class="checkbox-form" name="terms" value="">
                {/*<Link className="forgot-password" to="">Forgot Password?</Link><br/>*/}
              <button type="button" class=" register">Register</button>
          <button type="button" class=" login">Login</button>
                   </form>
      </div>
    </div>
  </div>

        );
    }
}

export default LoginForm;
