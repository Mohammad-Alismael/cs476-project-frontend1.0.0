import React, {Component} from 'react';
import {
    Card, CardImg, Col, Row
    , FormGroup, Label, Input, Button,
    CardTitle, CardBody, CardHeader
} from "reactstrap";
import tmp1 from '../Images/1.png';
class ItemDetails extends Component {
    state = {
        item_id : this.props.match.params.item_id,
        name : "Apple watch",
        description: "Apple Watch is a line of smart watches produced by Apple Inc. It incorporates fitness tracking, health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple products and services.\n" +
            "\n" +
            "The Apple Watch was released in April 2015[30][31] and quickly became the best-selling wearable device: 4.2 million were sold in the second quarter of fiscal 2015,[32][33] and more than 100 million people were estimated to use an Apple Watch as of December 2020.[34] Apple has introduced new generations of the Apple Watch with improved internal components each September —each labeled by Apple a 'Series', with certain exceptions.",
        InStock : true,
        price : '999',
        brand : 'Apple'
    }
    render() {
        return (
            <Card body>
                <Row>
                <Col xl={4}>
                <CardImg src={tmp1}/>
                </Col>
                <Col xl={8}>
                    <div className={'details'}>
                        <h3>{this.state.name}</h3>
                        <h6>{this.state.brand}</h6>
                        <h4>{this.state.price}$</h4>
                        <hr></hr>
                        <p>{this.state.description}</p>
                        <div className="options">
                            <i className="material-icons">local_shipping</i>
                            <span>Free shipping</span>
                        </div>
                        <div className="options">
                            <i className="material-icons">monetization_on</i>
                            <span>crypto currency support it</span>
                        </div>
                        <hr></hr>
                        <FormGroup style={{width: '7%'}}>
                            <Label for="exampleSelect">Quantity</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <Button color={"primary"}>Add To Cart</Button>
                    </div>
                </Col>
                </Row>
                <hr></hr>
                <Row style={{background : 'rgb(248,248,248)'}}>
                    <Col>
                        <Card>
                            <CardTitle>100% 100% Original</CardTitle>
                            <CardBody>Chocolate bar candy canes ice cream toffee cookie halvah.</CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardTitle>100% 100% Original</CardTitle>
                            <CardBody>Chocolate bar candy canes ice cream toffee cookie halvah.</CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardHeader>100% Original</CardHeader>
                            <CardBody>Chocolate bar candy canes ice cream toffee cookie halvah.</CardBody>
                        </Card>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default ItemDetails;