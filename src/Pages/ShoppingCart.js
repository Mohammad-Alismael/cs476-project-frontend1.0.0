import React, {Component} from 'react';
import GlobalContext from "../GlobalContext";
import ItemDetails from "./ItemDetails";
import tmp2 from '../Images/2.png';
import {Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Row} from "reactstrap";
import ShoppingCartItems from "../Components/ShoppingCartItems";

class ShoppingCart extends Component {
    state = {
        priceBeforeDisc : 0,
        discount:0,
        priceAfterDisc:0
    }
    componentDidMount() {
        console.log(this.context.cartItems,"this is from shopping cart global")
        var priceBeforeDisc= 0
        this.context.cartItems.map((val,index)=>{
            priceBeforeDisc+= val.price * val.quantity
        })
        this.setState({priceBeforeDisc})
        this.context.setCartItems()
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col xl={10}>
                        {
                            this.context.cartItems.map((val,index)=>{
                                return (
                                    <ShoppingCartItems
                                        id={val.id}
                                        productName={val.productName}
                                        price={val.price}
                                        brand={val.brand}
                                        rating={val.rating}
                                        quantity={val.quantity}
                                        srcImg={tmp2}/>
                                )
                            })
                        }
                    </Col>
                    <Col>
                        <Card style={{width: '230%',boxShadow: '0px 20px 47px 14px rgba(0,0,0,0.1)'}}>
                            <CardHeader>Price Details</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Input type="text" name="brand" placeholder={"coupons"} style={{width: '100px'}}/>
                                    <Button id={'APPLY-btn'} >APPLY</Button>
                                </FormGroup>
                                <hr/>
                                <p>Price before discount:     {this.state.priceBeforeDisc}$</p>
                                <p>Discount:     {this.state.discount}</p>
                                <span>Price after discount:   {this.state.priceAfterDisc}$</span>
                                <hr/>
                                <Button id={'btn'} size={'lg'} style={{width : '100%'}}>Place order</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
ShoppingCart.contextType = GlobalContext
export default ShoppingCart;