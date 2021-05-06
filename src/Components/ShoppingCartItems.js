import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, Col, Label, Row} from "reactstrap";
import ReactStars from "react-rating-stars-component";
import CounterInput from 'react-bootstrap-counter';
import Counter from "./Counter";
import axios from "axios";
class ShoppingCartItems extends Component {
    constructor(props) {
        super(props);
        this.counter = 0;
    }
    dismiss = (e) => {
        axios.post(`https://localhost:5001/api/carts/delete`, {
            "userId": parseInt(sessionStorage.getItem('user_id')),
            "product": parseInt(this.props.id)

        }).then((product) => {
            window.location.reload()
        }).catch((error) => {
            console.log(error)
            alert("error happened while deleting")
        })
    }
    render() {
        return (
            <Card className={"shoppingCartItems"}>
                <Row>
                <Col xl={3} style={{borderRight: '1px solid black'}}>
                    <CardImg src={this.props.srcImg} />
                </Col>
                <Col xl={9}>
                    <CardBody>
                        <p>{this.props.brand} - {this.props.productName}</p>
                        <p>{this.props.price}$</p>
                        <Counter value={this.props.quantity}/>
                        <Button color={"danger"} style={{float: 'right',marginTop:'100px',marginRight:'-120px'}} onClick={this.dismiss}>Remove</Button>
                        <ReactStars
                            count={5}
                            fullIcon={<i className="material-icons">star</i>}
                            emptyIcon={<i className="material-icons">star_border</i>}
                            size={24}
                            value={this.props.rating}
                            edit={false}
                            classNames={"shoppingCartItemsStars"}
                            activeColor="#ffd700"
                        />

                    </CardBody>
                </Col>
                </Row>
            </Card>
        );
    }
}

export default ShoppingCartItems;