import React, {Component} from 'react';
import '../Pages/css/LoginPage.css'
import img from '../Pages/css/U.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Container, Col} from "reactstrap";
class RegisterForm extends Component {

    render() {
        return (
            <div className="middle">
                <div className="middle-left">
                    <img className="middle-img" src={img} alt="" />
                </div>
                <div className="middle-right">
                    <h1>Create Account</h1>
                    <p>Fill the below form to create a new account.</p>
                    <form className="user-info">
                        <input type="text" className="form-input" name="fname" placeholder="Name" required/><br/>
                            <label htmlFor="fname"></label><br/>
                            <input type="email" className="form-input" name="email" placeholder="Email" required/><br/>
                                <label htmlFor="password"></label><br/>
                                <input type="password" className="form-input" name="password" placeholder="Password"
                                       required/><br/>
                                    <label htmlFor="confirm-password"></label><br/>
                                    <input type="password" className="form-input" name="confirm-password"
                                           placeholder="Confirm Password" required/><br/>
                                        <input type="checkbox" className="checkbox-form" name="terms" value="t"/>
                                            <label htmlFor="terms"> I accept the terms & conditions.</label><br/>
                                            <button className="login-button" type="button" name="button">Login</button>
                                            <button className="register-button" type="button" name="button">Register</button>
                    </form>
                </div>
            </div>
    );
    }
}

export default RegisterForm;
