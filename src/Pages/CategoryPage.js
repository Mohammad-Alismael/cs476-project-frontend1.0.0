import React, {Component} from 'react';
import {Card, CardTitle, Col, Container, Row} from "reactstrap";
import FilterBar from "../Components/FilterBar";
import ShopItem from "../Components/ShopItem";
import tmp1 from "../Images/1.png";
import axios from "axios";
class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Products : [

                // {
                //     price : 400,
                //     name : "Apple watch",
                //     item_id : 12,
                //     srcImg : tmp1
                // }

            ]
        }
        this.updateState = this.updateState.bind(this);
    }
    updateState = (newProductList) =>{
        console.log("from category page",newProductList)
    }
    componentDidMount() {
        setTimeout(()=>{
            axios.get(`https://localhost:5001/api/categories/${this.props.category}`).then((res)=>{
                res.data.map((val,key)=>{
                    var tmp = {}
                    tmp.price = val.price
                    tmp.name = val.productName
                    tmp.rate = val.rating
                    tmp.item_id = val.id
                    tmp.srcImg = tmp1
                    this.setState({
                        Products : [...this.state.Products,[tmp]]
                    })
                })
                // console.log(this.state.Products)
            }).catch((error)=>{
                alert('fetching data error')
                console.log(error)
            })
        },500)
    }

    render() {
        return (
            <Container fluid>
                <Row>
                <Col xl={3}>
                    <FilterBar updateMethod={this.updateState} products={this.state.Products}/>
                </Col>
                    <Col xl={9} style={{marginTop: '-120px'}}>
                        <Row>
                        {
                            this.state.Products.map((element,index)=> {
                                return (
                                    <Col xl={3}>
                                        <ShopItem price={element[0].price} productName={element[0].name}
                                                  item_id={element[0].item_id} srcImg={element[0].srcImg}
                                                  rate={element[0].rate} addToCartbtn={true}
                                        />
                                    </Col>
                                    )

                            })
                        }
                        </Row>
                    </Col>
                    </Row>

            </Container>
        );
    }
}

export default CategoryPage;