import React, {Component} from 'react';
import {Button, Card, Container} from "reactstrap";
import axios from "axios";

class ProfileSettings extends Component {
    state = {
      userName: "",
      name: "",
      surname: "",
      password: "",
      email: "",
      userType: null,
      locker: true
    }
    componentWillMount() {
      axios.get('https://localhost:5001/api/users/2')
          .then((res)=>{
              const {userName, name, surname, password, email, userType} = res.data;this.setState({userName})
            this.setState({name})
            this.setState({surname})
            this.setState({password})
            this.setState({email})
            this.setState({userType})

          }).catch((error)=>{
            alert("error !")
            console.log(error)
      })
    }

  render() {
        return (
            <Container>
            <Card body style={{marginBottom:'60px', width: '100%'}}>
              <section>
                <form>
                  <div className={"float-right"}>
                    <Button color={'primary'}  style={{margin : '5px 10px'}} onClick={()=> this.setState({locker : !this.state.locker})}>unlock</Button>
                    <Button color={'primary'} style={{margin : '5px 10px'}}>update info</Button>
                  </div>
                  <div class="container">
                    <h1>Personal Info</h1>

                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="text" class="form-label">First Name</label>
                        <input class="form-control" type="text" name="fName"
                               disabled={this.state.locker}
                               value={this.state.name}/>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="text" class="form-label">Last Name</label>
                        <input class="form-control" type="email" name="lName"
                               disabled={this.state.locker}
                               value={this.state.surname}></input>

                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="email" class="form-label">Email address</label>
                        <input class="form-control" type="email" name="email"
                               disabled={this.state.locker}
                               value={this.state.email}/>

                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="text" class="form-label">Username</label>
                        <input class="form-control" type="text" name="username"
                               disabled={this.state.locker}
                               value={this.state.userName}/>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <label htmlFor="text" className="form-label">password</label>
                        <input className="form-control" type="text" name="username"
                               disabled={this.state.locker}
                               value={this.state.password}/>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="text" class="form-label">userType</label>
                        <input class="form-control" type="text" name="display" disabled={this.state.locker}
                               value={this.state.userType == null? "not specified" :this.state.userType }/>
                      </div>
                    </div>
                  </div>
                </form>
              </section>

            </Card>
            </Container>
        );
    }
}

export default ProfileSettings;
