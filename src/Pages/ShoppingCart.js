import React, {Component} from 'react';
import GlobalContext from "../GlobalContext";
import ItemDetails from "./ItemDetails";
import tmp2 from '../Images/2.png';
import {Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Row} from "reactstrap";
import ShoppingCartItems from "../Components/ShoppingCartItems";
import {log10} from "chart.js/helpers";

class ShoppingCart extends Component {
    state = {
        priceBeforeDisc : 0,
        discount:0,
        priceAfterDisc:0
    }
    componentDidMount() {
        console.log(this.context.cartItems,"this is from shopping cart global")
        this.context.setCartItems()
    }

    next = (e) =>{
        e.preventDefault();
        this.props.history.push('/checkout');
    }

    render() {

        return (
            // <Container fuild >
                <Row style={{width: '111%'}}>
                    <Col xl={9}>
                        {
                            this.context.cartItems.sort((a,b)=>{
                                return a.id - b.id
                            }).map((val,index)=>{
                                return (
                                    <ShoppingCartItems
                                        key={val.id.toString()}
                                        id={val.id}
                                        productName={val.productName}
                                        price={val.price}
                                        brand={val.brand}
                                        rating={val.rating}
                                        maxQuantity={val.quantity}
                                        chosenQuantity={val.chosenQuantity}
                                        srcImg={val.picture}/>
                                )
                            })
                        }
                    </Col>
                    <Col xs={3} xl={3}>
                        <Card style={{width: '300px',boxShadow: '0px 20px 47px 14px rgba(0,0,0,0.1)'}}>
                            <CardHeader>Price Details</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        name="brand"
                                        placeholder={"coupons"}
                                        style={{width: '100px'}}
                                        onChange={this.context.setDiscountCoupon}
                                    />
                                    <Button id={'APPLY-btn'} onClick={this.context.getCouponDiscount}>APPLY</Button>
                                </FormGroup>
                                <hr/>
                                <p>Price before discount:     {(this.context.priceBeforeDisc).toFixed(2)}$</p>
                                <p>Discount:     {this.context.percentageDiscount}%</p>
                                <span>Price after discount:   {(this.context.priceAfterDisc).toFixed(2)}$</span>
                                <hr/>
                                <Button id={'btn'} size={'lg'} style={{width : '100%'}}
                                        onClick={this.next}
                                >Place order</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            // </Container>
        );
    }
}
ShoppingCart.contextType = GlobalContext
export default ShoppingCart;