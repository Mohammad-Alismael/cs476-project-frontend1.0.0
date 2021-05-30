import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, Col, Label, Row} from "reactstrap";
import ReactStars from "react-rating-stars-component";
import CounterInput from 'react-bootstrap-counter';
import Counter from "./Counter";
import axios from "axios";
import {toast} from "react-toastify";
import {withRouter} from "react-router-dom";
import GlobalContext from "../GlobalContext";
import ShoppingCart from "../Pages/ShoppingCart";
class ShoppingCartItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Quantity : this.props.chosenQuantity
        }
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

    nextPath(path) {
        this.props.history.push(path);
    }
    render() {
        if (this.props.applied == false){
            return (
                <Card className={"shoppingCartItems"}>
                    <Row>
                        <Col xl={3} style={{borderRight: '1px solid black'}} onClick={() => this.nextPath(`/item-details/${this.props.id}`)}>
                            <CardImg src={'data:image/jpeg;base64,' + this.props.srcImg}  alt={"product img"}/>
                        </Col>
                        <Col xl={9}>
                            <CardBody>
                                <p>{this.props.brand == null ? "no brand" : this.props.brand} - {this.props.productName}</p>
                                <p>{this.props.price}$</p>
                                <Counter
                                    maxQuantity={this.props.maxQuantity}
                                    chosenQuantity={this.props.chosenQuantity}
                                    productId={this.props.id}/>
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
        }else {
            return (
                <Card className={"shoppingCartItems"} style={{border: '2px solid red'}}>
                    <Row>
                        <Col xl={3} style={{borderRight: '1px solid black'}} onClick={() => this.nextPath(`/item-details/${this.props.id}`)}>
                            <CardImg src={this.props.srcImg != null ? 'data:image/jpeg;base64,' + this.props.srcImg :"https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg" }  alt={"product img"}/>
                        </Col>
                        <Col xl={9}>
                            <CardBody>
                                <p>{this.props.brand == null ? "no brand" : this.props.brand} - {this.props.productName}</p>
                                <p>New price {(this.props.price * ((100 - this.context.percentageDiscount)/100)).toFixed(2)}$</p>
                                <Counter
                                    maxQuantity={this.props.maxQuantity}
                                    chosenQuantity={this.props.chosenQuantity}
                                    productId={this.props.id}/>
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
}
ShoppingCartItems.contextType = GlobalContext
export default withRouter(ShoppingCartItems);