import {Component,Link} from 'react';
import '../Pages/css/LoginPage.css'
import img from '../Pages/css/Design.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import {toast} from "react-toastify";
import {Button, Card, Col, Container, Row, Spinner} from "reactstrap";

class LoginForm extends Component {
    state = {
        username: "",
        password: "",
        loading: false
    }
    nextPath(path) {
        this.props.history.push(path);
    }
    login = (e) =>{
        e.preventDefault()
        this.setState({loading: true})
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
                sessionStorage.setItem("mailCode", res.data.mailCode);
                this.context.updateEmail(res.data.email);
                this.context.updateUserID(res.data.id);
                this.context.updateUsername(res.data.userName);
                this.context.setVerificationCode(res.data.mailCode);
                this.context.updateIsLoggedIn(true);
                this.nextPath('/factor-authentication');
                // if (res.data.userType == "Customer"){
                //     this.nextPath('/')
                // }else if (res.data.userType == "Sales Manager"){
                //     this.nextPath('/dashBoard')
                // }else if (res.data.userType == "Product Manager"){
                //     this.nextPath('/product-owner-landing-page')
                // }else{
                //     this.nextPath('/')
                //     console.log(this.context.userID)
                // }
            }).catch(error =>{
                this.setState({loading: false})
                console.log(error)
                    toast.error("username or password is incorrect")

            })
        }else {
            toast.warn("check your info")
        }
    }
    updateSate = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name] : e.target.value})
    }
    render() {
        if (!this.state.loading){
            return (
                <Container fuild className={'noPadding'}>
                    <Row>
                        <Col lg={6} md={6} sm={0} className="left">
                            <img className="middle-img" src={img} alt="" />
                        </Col>
                        <Col lg={4} md={4} sm={12} xs={12} className="right" >
                            <h1>Login</h1>
                            <div className="user-info">
                                <p>Welcome back, please login to your account.</p>
                                <label className="email" for="email">username</label><br/>
                                <input type="text" className="form-input" name="username" required onChange={this.updateSate}/><br/>
                                <label className="password" for="password">Password</label><br/>
                                <input type="password" className="form-input password-input" name="password" required onChange={this.updateSate}/><br/>
                                <button type="button" className="register" onClick={() => this.nextPath('/register')}>Register</button>
                                <button type="button" className="login" onClick={this.login}>log In</button>
                            </div>
                        </Col>
                    </Row>

                </Container>

            );
        }else {
            return (
                <div>
                    <Spinner color="black" style={{ width: '20rem', height: '20rem',marginLeft: '45%',marginTop: '10%',marginBottom: '10%' }}/>
                </div>
            )
        }

    }
}
LoginForm.contextType = GlobalContext
export default LoginForm;
