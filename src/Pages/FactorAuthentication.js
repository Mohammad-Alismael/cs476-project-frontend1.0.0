import React, {Component} from 'react';

import './css/Factor.css'
import {Button, Card, CardBody, CardHeader, CardText, CardTitle, FormGroup, Input, InputGroup, Label} from "reactstrap";
import {toast} from "react-toastify";
class FactorAuthentication extends Component{

    state = {
        verificationCode: ""
    }
    nextPath(path) {
        this.props.history.push(path);
    }
    verify = (e) =>{
        e.preventDefault()
        if (this.context.verificationCode == this.state.verificationCode ||
        sessionStorage.getItem('mailCode') == this.state.verificationCode){
            const userType = sessionStorage.getItem('userType');
            if (userType == "Customer"){
                this.nextPath('/')
            }else if (userType == "Sales Manager"){
                this.nextPath('/dashBoard')
            }else if (userType == "Product Manager"){
                this.nextPath('/product-owner-landing-page')
            }else{
                this.nextPath('/')
                console.log(this.context.userID)
            }
        }else {
           toast.info('the verificationCode is incorrect')
        }
    }
    render() {
        return (
            <>
                <form className="in-the-middle">
                    <Card>
                        <CardHeader>Two Factor Authentication</CardHeader>
                        <CardBody>
                            <CardText>Your account is secured with Two Factor Authentication, therefore you will receive a code.
                                Please enter your verification code to verify your account.<br/>
                                If you do not receive the code within some minutes, try sending a new code.
                            </CardText>
                            <FormGroup>
                                <Label for="exampleEmail">Verification code</Label>
                                <Input type="test" name="verificationCode" id="exampleEmail" placeholder=""
                                    onChange={(e)=>{this.setState({verificationCode : e.target.value})}}/>
                            </FormGroup>
                            <Button id={'btn'} size={'lg'} style={{width : '100%',margin: '10px'}} onClick={this.verify}>Verify</Button>
                        </CardBody>
                    </Card>
                </form>
                </>
        );
    }
}


export default FactorAuthentication;

