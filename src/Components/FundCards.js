import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from "reactstrap";
import axios from "axios";
import {toast} from "react-toastify";

class FundCards extends Component {
    addBalance =(e)=>{
        e.preventDefault();
        axios.post('https://localhost:5001/api/finance/addMoney',{
            "customerID":parseInt(sessionStorage.getItem('user_id')),
            "fee": (this.props.price* this.props.percentageMore) + this.props.price
        }).then((res)=>{
            toast.success('balance added successfully')
        }).catch(error =>{
                toast.error("error happened while adding balance")
        })
    }
    render() {
        return (
            <div className="pricing-column col-lg-4 col-md-6">
                <Card>
                    <div className="card-header">
                        <h3>{this.props.price}₺</h3>
                    </div>
                    <div className="card-body">
                        <h2 className="price-text">{this.props.price} TL will be transferred to your account</h2>
                        <p>You can earn {this.props.price* this.props.percentageMore}TL extra shopping points</p>
                        <button className="btn btn-lg btn-block btn-dark" type="button" onClick={this.addBalance}>Submit</button>
                    </div>
                </Card>
            </div>
            );

    }
}

FundCards.propTypes = {};

export default FundCards;