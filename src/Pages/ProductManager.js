import React, {Component} from 'react';
import {Card, CardBody, CardHeader, CardTitle, Col, Container, Row, Table} from "reactstrap";
import ShopItem from "../Components/ShopItem";
import tmp1 from "../Images/1.png";

class ProductManager extends Component {
    state = {
        recommendationProducts : [
            {
                price : 400,
                name : "Apple watch",
                item_id : 5,
                srcImg : tmp1
            },
            {
                price : 400,
                name : "Apple watch",
                item_id : 12,
                srcImg : tmp1
            },
            {
                price : 400,
                name : "Apple watch",
                item_id : 12,
                srcImg : tmp1
            },
            {
                price : 400,
                name : "Apple watch",
                item_id : 12,
                srcImg : tmp1
            },{
                price : 400,
                name : "Apple watch",
                item_id : 12,
                srcImg : tmp1
            }
            ]
    }
    render() {
        return (
            <Card  body style={{width: '111%'}}>
                <Row>
                    <Card  color={"white"} style={{width:'120%'}}>
                        <CardHeader>
                            <h5>Most purchased products</h5>
                        </CardHeader>
                        <CardBody>

                            <Row>
                                <Row>
                                    {
                                        this.state.recommendationProducts.map((element,index)=>(
                                            <Col>
                                                <ShopItem price={element.price} productName={element.name}
                                                          addToCartbtn={false}
                                                          item_id={element.item_id} srcImg={element.srcImg} rate={3}/>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
                <Row xl={12}>
                <Card style={{width: '111%'}}>
                    <CardHeader>
                        <h4>Most purchased computer components from you</h4>
                    </CardHeader>
                    <CardBody>
                        <Table striped>
                            <thead>
                            <tr>
                                <th>order id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>product</th>
                                <th>quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Otto</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>Thornton</td>
                                <td>Thornton</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td>the Bird</td>
                                <td>the Bird</td>
                            </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
                </Row>
            </Card>
        );
    }
}

export default ProductManager;