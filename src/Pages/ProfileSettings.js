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
      locker: true,
        balance: 0
    }
    componentWillMount() {
      axios.get(`https://localhost:5001/api/users/${sessionStorage.getItem('user_id')}`)
          .then((res)=>{
              const {userName, name, surname, password, email, userType,balance} = res.data;this.setState({userName})
            this.setState({name})
            this.setState({surname})
            this.setState({password})
            this.setState({email})
              this.setState({balance})
            this.setState({userType})

          }).catch((error)=>{
            alert("error !")
            console.log(error)
      })
    }

    updateInfo = (e)=>{
        e.preventDefault();
        axios.post(`https://localhost:5001/api/account/update/${parseInt(sessionStorage.getItem('user_id'))}`,{
            "Id":parseInt(sessionStorage.getItem('user_id')),
            "userName": this.state.userName,
            "Name": this.state.name,
            "Surname": this.state.surname,
            "Age": "no data",
            "Password": this.state.password,
            "Email": this.state.email,
            "UserType": this.state.userType
        }).then((res)=>{
            console.log(res)
            window.location.reload();
        }).catch((error)=>{
            alert("error happened for updating data!!")
            console.log(error)
        })
        console.log(this.state)
    }
    updateSate = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name] : e.target.value})
    }

  render() {
        return (
            <Container>
            <Card body style={{marginBottom:'60px', width: '100%'}}>
              <section>
                <form>
                  <div className={"float-right"}>
                    <Button color={'primary'}  style={{margin : '5px 10px'}} onClick={()=> this.setState({locker : !this.state.locker})}>unlock</Button>
                    <Button color={'primary'} style={{margin : '5px 10px'}} onClick={this.updateInfo}>update info</Button>
                  </div>
                  <div class="container">
                    <h1>Personal Info</h1>

                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="email" class="form-label">Email address</label>
                        <input class="form-control" type="email" name="email"
                               disabled={this.state.locker}
                               onChange={this.updateSate}
                               value={this.state.email}/>

                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="text" class="form-label">Username</label>
                        <input class="form-control" type="text" name="userName"
                               disabled={this.state.locker}
                               onChange={this.updateSate}
                               value={this.state.userName}/>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <label htmlFor="text" className="form-label">password</label>
                        <input className="form-control" type="text" name="password"
                               disabled={this.state.locker}
                               onChange={this.updateSate}
                               value={this.state.password}/>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="text" class="form-label">userType</label>
                        <input class="form-control" type="text" name="display" disabled={true}
                               value={this.state.userType == null? "not specified" :this.state.userType }/>
                      </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <label htmlFor="text" className="form-label">password</label>
                            <input className="form-control" type="text" name="password"
                                   disabled={true}
                                   onChange={this.updateSate}
                                   value={this.state.balance}/>
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
