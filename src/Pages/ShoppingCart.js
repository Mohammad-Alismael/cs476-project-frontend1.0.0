import React, {Component} from 'react';
import GlobalContext from "../GlobalContext";
import ItemDetails from "./ItemDetails";
import tmp2 from '../Images/2.png';
import {Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Row} from "reactstrap";
import ShoppingCartItems from "../Components/ShoppingCartItems";

class ShoppingCart extends Component {

    componentDidMount() {
        this.context.setCartItems()
        console.log(this.context.cartItems,"this is from shopping cart global")
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
                                        brand={"no brand"}
                                        rating={val.rating}
                                        quantity={0}
                                        srcImg={tmp2}/>
                                )
                            })
                        }
                    </Col>
                    <Col>
                        <Card style={{width: '230%'}}>
                            <CardHeader>Price Details</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Input type="text" name="brand" placeholder={"coupons"} />
                                    <Button id={'Go-btn'} >APPLY</Button>
                                </FormGroup>
                                <hr/>
                                <p>Price before discount:</p>
                                <p>Discount:</p>
                                <span>Price after discount:</span>
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