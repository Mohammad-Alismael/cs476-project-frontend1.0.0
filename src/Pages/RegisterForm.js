import React, {Component} from 'react';
import '../Pages/css/LoginPage.css'
import img from '../Pages/css/U.png'
import 'bootstrap/dist/css/bootstrap.min.css';
class RegisterForm extends Component {
    render() {
        return (
           <div class="container-fluid">

  <div class="row ">
    <div class="col-lg-6 col-md-6 col-sm-6 create-left" style="">
      <img class="middle-img" src="images/U.png" alt="">
    </div>
    <div class="col-lg-4 col-md-4 col-sm-4 create-right" style="">
      <h1>Create Account</h1>
      <p>Fill the below form to create a new account.</p>
      <form class="user-info" action="index.html" method="post">
        <input type="text" class="form-input" name="fname" placeholder="Name" required><br>
        <label for="fname"></label><br>
        <input type="email" class="form-input" name="email" placeholder="Email" required><br>
        <label for="password"></label><br>
        <input type="password" class="form-input" name="password" placeholder="Password" required><br>
        <label for="confirm-password"></label><br>
        <input type="password" class="form-input confirm-password" name="confirm-password" placeholder="Confirm Password" required><br>
        <input type="checkbox" class="checkbox-form" name="terms" value="t">
        <label for="terms"> I accept the terms & conditions.</label><br>
        <button class="login-button" type="button" name="button">Login</button>
        <button class="register-button" type="button" name="button">Register</button>
      </form>
      </div>
      </div>
      </div>
        );
    }
}

export default RegisterForm;
