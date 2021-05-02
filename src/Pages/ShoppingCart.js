import React, {Component} from 'react';
import GlobalContext from "../GlobalContext";
import ItemDetails from "./ItemDetails";
import tmp2 from '../Images/2.png';
import {Card, Col, Container, Row} from "reactstrap";
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
                        {/*<ShoppingCartItems*/}
                        {/*    productName={"mouse"}*/}
                        {/*    price={300}*/}
                        {/*    brand={"google"}*/}
                        {/*    rating={5}*/}
                        {/*    quantity={2}*/}
                        {/*    srcImg={tmp2}/>*/}
                        {/*<ShoppingCartItems*/}
                        {/*    productName={"keyboard"}*/}
                        {/*    price={600}*/}
                        {/*    brand={"microsoft"}*/}
                        {/*    rating={4}*/}
                        {/*    quantity={1}*/}
                        {/*    srcImg={tmp2}/>*/}
                        {/*<ShoppingCartItems*/}
                        {/*    productName={"msi"}*/}
                        {/*    price={2000}*/}
                        {/*    brand={"microsoft"}*/}
                        {/*    rating={1}*/}
                        {/*    quantity={10}*/}
                        {/*    srcImg={tmp2}/>*/}
                    </Col>
                    <Col>
                        <Card>
                            gdfg
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
ShoppingCart.contextType = GlobalContext
export default ShoppingCart;