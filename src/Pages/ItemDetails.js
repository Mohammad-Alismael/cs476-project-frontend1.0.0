import React, {Component} from 'react';
import {
    Card, CardImg, Col, Row
    , FormGroup, Label, Input, Button,
    CardTitle, CardBody, CardHeader, CardText, TabPane, TabContent, NavLink, NavItem, Nav, Container
} from "reactstrap";
import tmp1 from '../Images/1.png';
import '../Pages/css/ItemDetails.css'
import '../Pages/css/LandingPage.css';
import classNames from "classnames";
class ItemDetails extends Component {
    state = {
        activeTab : 1,
        item_id : this.props.match.params.item_id,
        name : "Apple watch",
        description: "Apple Watch is a line of smart watches produced by Apple Inc. It incorporates fitness tracking, health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple products and services.\n" +
            "\n" +
            "The Apple Watch was released in April 2015[30][31] and quickly became the best-selling wearable device: 4.2 million were sold in the second quarter of fiscal 2015,[32][33] and more than 100 million people were estimated to use an Apple Watch as of December 2020.[34] Apple has introduced new generations of the Apple Watch with improved internal components each September —each labeled by Apple a 'Series', with certain exceptions.",
        InStock : true,
        price : '999',
        brand : 'Apple'
    }
    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab : tab});
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

                        <Button id={'btn'}>Add To Cart</Button>
                    </div>
                </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Nav tabs style={{background : 'transparent',width: '100%'}}>
                        <NavItem>
                            <NavLink
                                    className={classNames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Rates & reviews
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classNames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Add comments
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Container body style={{background : 'red',width: '100%'}}>
                                        <Row>
                                            <Col xl={4}>
                                                <Card>
                                                    hello1
                                                </Card>
                                            </Col>
                                            <Col xl={8}>
                                                <Card>
                                                    hello2
                                                </Card>
                                            </Col>
                                        </Row>
                                </Container>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col>
                                        <Card body>
                                                <FormGroup>
                                                    <Label for="exampleText">Text Area</Label>
                                                    <Input type="textarea" name="text" id="exampleText" />
                                                </FormGroup>
                                            <Button id={'btn'}>Add comment</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                </Row>
                <hr></hr>
                <Row style={{background : 'rgb(248,248,248)'}}>
                    <Col>
                        <Card className={'granteeCard'}>
                            <i className="material-icons">monetization_on</i>
                            <h5>100% Original</h5>
                            <p>Chocolate bar candy canes ice cream toffee cookie halvah.</p>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={'granteeCard'}>
                            <i className="material-icons">access_time</i>
                            <h5>10 Day Replacement</h5>
                            <p>Marshmallow biscuit donut dragée fruitcake wafer.</p>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={'granteeCard'}>
                            <i className="material-icons">monetization_on</i>
                            <h5>1 Year Warranty</h5>
                            <p>Chocolate bar candy canes ice cream toffee cookie halvah.</p>
                        </Card>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default ItemDetails;