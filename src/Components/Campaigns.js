import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardTitle, FormGroup, Label, Input, Button, CardHeader} from "reactstrap";
import {toast} from "react-toastify";
import axios from "axios";

class Campaigns extends Component {
    state = {
        campaignCode:"",
        startingDate : 0,
        endingDate:0,
        percentageDiscount: 0
    }
    updateSate = (e) =>{
        e.preventDefault()
        if (e.target.name == "startingDate" || e.target.name == "endingDate"){

            var date = Date.parse(e.target.value)
            console.log(date)
            this.setState({[e.target.name]:date })

        }else {
            this.setState({[e.target.name] : e.target.value})
        }

    }
    Campaign = (e) =>{
        e.preventDefault();
        axios.post(`https://localhost:5001/api/campaign/add`,{
            "userId": parseInt(sessionStorage.getItem("user_id")),
            "productId": parseInt(this.props.productId),
            "startDate": Math.floor(this.state.startingDate/1000),
            "endDate":Math.floor(this.state.endingDate/1000),
            "description":this.state.campaignCode,
            "percentage": parseInt(this.state.percentageDiscount)
        }).then((res)=>{
            toast.success("you've successfully added a campaign")
        }).catch((error) => {
            console.log(error)
            toast.error("error happened while adding a campaign")
        })

        console.log("user id",parseInt(sessionStorage.getItem("user_id")))
        console.log("product id",parseInt(this.props.productId))
    }
    render() {
        return (
            <Card>
                <CardHeader>Adding Campaigns</CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label for="exampleEmail">campaign code</Label>
                        <Input type="email" name="campaignCode" placeholder="abc123.."
                               onChange={this.updateSate}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Starting date</Label>
                        <Input type="date" name="startingDate" placeholder=""
                               onChange={this.updateSate}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">ending date</Label>
                        <Input type="date" name="endingDate" placeholder=""
                               onChange={this.updateSate}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">percentage discount</Label>
                        <Input type="number" min={0} max={100} name="percentageDiscount"
                               placeholder="" onChange={this.updateSate}/>
                    </FormGroup>
                </CardBody>
                <Button id={'btn'} onClick={this.Campaign}>Add campaign</Button>
            </Card>
        );
    }
}

Campaigns.propTypes = {};

export default Campaigns;