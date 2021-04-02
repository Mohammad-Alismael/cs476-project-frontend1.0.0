import React, {Component} from 'react';
import {Card, CardTitle, Col, Container, Row} from "reactstrap";
import FilterBar from "../Components/FilterBar";
import ShopItem from "../Components/ShopItem";
import tmp1 from "../Images/1.png";
import axios from "axios";
class ComputerCpuPage extends Component {
    state = {
        Products : [
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
    componentDidMount() {
        axios.get(`https://localhost:5001/api/products`)
            .then((res)=>{
                // {
                //     "id": 1,
                //     "productName": "RTX3070",
                //     "price": 2000,
                //     "description": "Such an awesome GPU, the best",
                //     "category": "2",
                //     "rating": 0
                // }
                // {
                //     price : 400,
                //         name : "Apple watch",
                //     item_id : 12,
                //     srcImg : tmp1
                // }
        }).catch((error)=>{
            alert('error happened')
            console.log(error)
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                <Col xl={3}>
                    <FilterBar/>
                </Col>
                    <Container fluid style={{width: '85%'}}>
                        <Row>
                        {
                            this.state.Products.map((element,index)=>(
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