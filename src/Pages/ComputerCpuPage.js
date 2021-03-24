import React, {Component} from 'react';
import {Card, CardTitle, Col, Container, Row} from "reactstrap";
import FilterBar from "../Components/FilterBar";
import ShopItem from "../Components/ShopItem";
import tmp1 from "../Images/1.png";
class ComputerCpuPage extends Component {
    state = {
        recommendationProducts : [
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
            }, {
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
            }, {
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
            }, {
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
            }
        ]
    }
    render() {
        return (
            <Container fluid>
                <Row>
                <Col xl={3}>
                    <FilterBar/>
                </Col>
                    <Container fluid style={{width: '75%'}}>
                        <Row>
                        {
                            this.state.recommendationProducts.map((element,index)=>(
                                <Col xl={3}>
                                    <ShopItem price={element.price} productName={element.name}
                                              item_id={element.item_id} srcImg={element.srcImg}/>
                                </Col>
                            ))
                        }
                        </Row>
                    </Container>
                    </Row>

            </Container>
        );
    }
}

export default ComputerCpuPage;