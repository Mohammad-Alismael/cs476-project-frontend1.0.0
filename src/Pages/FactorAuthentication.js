import React, {Component} from 'react';

import './css/Factor.css'
class FactorAuthentication extends Component{


    render() {
        return (
            <>
            <form className="in-the-middle">
                <div className="card">
                    <h3 className="card-header"><i className="fa fa-user-circle"/> Two Factor Authentication</h3>

                    <div className="card-block">
                        <div className="lead">
                            <i className="fa fa-info-circle"></i>
                            Your account is secured with Two Factor Authentication, therefore you will receive a code.
                            Please enter your verification code to verify your account.
                            <br/>
                                If you do not receive the code within some minutes, try sending a new code.
                        </div>
                    </div>

                    <div className="card-block">
                        <div className="form-group row">
                            <label htmlFor="smscode" className="col-4 col-form-label text-right">Verification
                                code</label>
                            <div className="col-8">
                                <input type="text" className="form-control" id="smscode"
                                       placeholder="Enter your code here"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col col-8 offset-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <button type="submit" className="btn btn-block btn-success">Verify</button>
                                    </div>
                                    <div className="col-sm-6">
                                        <button type="submit" className="btn btn-block btn-primary">Send new code</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
                </>
        );
    }
}


export default FactorAuthentication;

