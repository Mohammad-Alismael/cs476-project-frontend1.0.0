import React, {Component} from 'react';
import '../Pages/css/LoginPage.css'
import img from '../Pages/css/U.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Container, Col} from "reactstrap";
class RegisterForm extends Component {

    render() {
        return (
           <Container fluid>
            <Row>
              <div class="col-lg-6 col-md-6 col-sm-6" >
                <img src={img} alt="" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4" style={{background: 'white'}}>
                <h1>Create Account</h1>
                <p>Fill the below form to create a new account.</p>
                  <form class="user-info">
                    <input type="text" class="form-input" name="fname" placeholder="Username" required/><br/>
                    <label for="fname"></label><br/>
                    <input type="email" class="form-input" name="email" placeholder="Email" required/><br/>
                    <label for="password"></label><br/>
                    <input type="password" class="form-input" name="password" placeholder="Password" required/><br/>
                    <label for="confirm-password"></label><br/>
                    <input type="password" class="form-input confirm-password" name="confirm-password" placeholder="Confirm Password" required/><br/>
                    <input type="checkbox" class="checkbox-form" name="terms" value="t"/>
                    <label for="terms"> I accept the terms & conditions.</label><br/>
                    <button className="login-button" type="button" name="button" style={{marginTop: '10px'}}>Register</button>
                  </form>
              </div>
            </Row>

            </Container>
    );
    }
}

export default RegisterForm;
