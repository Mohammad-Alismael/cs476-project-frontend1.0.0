import React, {Component} from 'react';
import '../Pages/css/LoginPage.css'
import img from '../Pages/css/U.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Container, Col, Input} from "reactstrap";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import LandingPage from "./LandingPage";
import {toast} from "react-toastify";
class RegisterForm extends Component {
    state = {
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
        userType : "",
        productManagerList: [],
        isHeSalesManager: false,
        whichProductManger : 0
    }
    componentDidMount() {
        axios.get('https://localhost:5001/api/users').then((res)=>{
            var productManagerList ;
            productManagerList = res.data.filter((val)=>{
                if (val.userType == "Product Manager"){
                    return val
                }
            })
            this.setState({productManagerList})
            console.log(productManagerList)
        })
    }

    nextPath(path) {
        this.props.history.push(path);
    }
    updateSate = (e) =>{
        e.preventDefault()

        this.setState({[e.target.name] : e.target.value})
        if (e.target.value == "Sales Manager"){

            this.setState({isHeSalesManager: true})
        }else{
            this.setState({isHeSalesManager: false})
        }
    }
    getProductManagerName =(e)=>{
        if (e.target.value == "select product Manager"){
            toast.info("select product Manager")
        }else {
            this.setState({whichProductManger : e.target.options[e.target.selectedIndex].dataset.id})
        }

    }
    createAccount = (e) =>{
        e.preventDefault()
        if (this.state.password == this.state.confirmPassword
            && this.state.userType != ""){
            axios.post(`https://localhost:5001/api/account/register`,{
                "userName": this.state.username,
                "name": "no data",
                "surname": "no data",
                "age": "no data",
                "password": this.state.password,
                "email": this.state.email,
                "userType" : this.state.userType,
                linking_id : this.state.whichProductManger
            })
                .then(res => {
                    this.context.updateUsername(this.state.username)
                    this.context.updateEmail(this.state.email)
                    toast.success("successfully added")
                    this.nextPath('/login')
                }).catch(error =>{
                    if(error.response.status == 400)
                        toast.info("username is taken")
                    toast.error("error happened")
                    console.log(error)
            })
            console.log(this.state)
        }else{
            if (this.state.userType == "" || this.state.userType == "User Type"){
                toast.warn("choose user type")
            }else{
                toast.warn("check your info")
            }

        }

        // console.log(this.state)
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <div class="col-lg-6 col-md-6 col-sm-6 create-left" >
                        <img className={"middle-img"} src={img} alt="" />
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 create-right">
                        <h1>Create Account</h1>
                        <p>Fill the below form to create a new account.</p>
                        <form class="user-info">
                            <input type="text" class="form-input" name="username" placeholder="Username"
                                   onChange={this.updateSate}
                                   required/><br/>
                            <label for="fname"></label><br/>
                            <input type="email" className="form-input" name="email" id="email" placeholder="Email"
                                   onChange={this.updateSate}
                                   title={"@gmail.com"}
                                   required pattern={'/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/'}/><br/>
                            <label for="password"></label><br/>
                            <input type="password" class="form-input" name="password" placeholder="Password"
                                   onChange={this.updateSate}
                                   required/><br/>
                            <label for="confirm-password"></label><br/>
                            <input type="password" className="form-input confirm-password" name="confirmPassword" placeholder="Confirm Password"
                                   onChange={this.updateSate}required/><br/>
                            <Input type="select" name="userType" className="userType"
                                   onChange={this.updateSate}
                                   style={{border : '1px solid rgb(111, 107, 232)',height : '3rem',marginBottom: '8px'}}>
                                <option>User Type</option>
                                <option>Sales Manager</option>
                                <option>Customer</option>
                                <option>Product Manager</option>
                            </Input>
                            {
                                (this.state.isHeSalesManager)? (
                                    <Input type="select" name="whichProductManger" className="userType"
                                           onChange={this.getProductManagerName}
                                           style={{border : '1px solid rgb(111, 107, 232)',height : '3rem',marginBottom: '8px'}}>
                                        <option>select product Manager</option>
                                        {
                                            this.state.productManagerList.map((data)=>{
                                                return (<option data-id={data.id}>{data.userName}</option>)
                                            })
                                        }
                                    </Input>
                                ): null
                            }
                            <button className="register" type="button" name="button"
                                    onClick={this.createAccount}
                                    style={{marginTop: '10px'}}>Log in</button>
                        </form>
                    </div>
                </Row>
            </Container>
    );
    }
}
RegisterForm.contextType = GlobalContext
export default RegisterForm;
