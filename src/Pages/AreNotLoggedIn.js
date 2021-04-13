import React, {Component} from 'react';
import {Button} from "reactstrap";
import {withRouter} from 'react-router-dom';

class AreNotLoggedIn extends Component {
    nextPath(path) {
        sessionStorage.setItem("isLoggedIn", false)
        this.props.history.push(path);
    }
    render() {
        return (
            <div>
                <h1>you have to login in order to open this page</h1>
                <Button onClick={() => this.nextPath('/login')} id={"btn"} style={{marginLeft: '100px'}}>go to log in page</Button>
            </div>
        );
    }
}



export default withRouter(AreNotLoggedIn);