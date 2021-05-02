import React, {Component} from 'react';
import {Card, CardTitle, Col, Container, Row,Spinner} from "reactstrap";
import FilterBar from "../Components/FilterBar";
import ShopItem from "../Components/ShopItem";
import tmp1 from "../Images/1.png";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import ShoppingCart from "./ShoppingCart";
class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Products: [

                // {
                //     price : 400,
                //     name : "Apple watch",
                //     item_id : 12,
                //     srcImg : tmp1
                // }

            ],
            newProductList: [],
            stars: [0, 0, 0, 0, 0],
            maxPrice: 0,
            loading: 'initial',
        }
        this.updateState = this.updateState.bind(this);
    }

    updateState = (newProductList) => {
        this.setState({newProductList})
        console.log("from category page", newProductList)
    }

    componentDidMount() {
        this.setState({loading: 'true'});
        setTimeout(() => {
            axios.get(`https://localhost:5001/api/categories/${this.props.category}`).then((res) => {
                res.data.map((val, key) => {
                    const tmp = {};
                    tmp.price = val.price
                    tmp.name = val.productName
                    tmp.rate = val.rating
                    tmp.item_id = val.id
                    tmp.srcImg = tmp1
                    this.setState({
                        Products: [...this.state.Products, [tmp]]
                    })
                    this.setState({
                        newProductList: [...this.state.newProductList, [tmp]]
                    })
                })
                this.countStars()
            }).catch((error) => {
                alert('fetching data error')
                console.log(error)
            })



        }, 500)
        this.setState({
            loading: 'false'
        });

        this.context.setCartItems().then((data)=>{
            this.context.changeShoppingCard(data)
        })
    }

    countStars(){
        const tmpArray = []
        const stars2 = [0, 0, 0, 0, 0]
        this.state.Products.map((val, index) => {
            tmpArray[index] = val[0].price
            for (let i = 0; i < 5; i++) {
                if (parseInt(val[0].rate) >= i + 1) {
                    stars2[i] += 1;
                }
            }
        })

        this.setState({maxPrice: Math.max.apply(null, tmpArray)}, function () {
            console.log(this.state.maxPrice, "max value from this page")
        })
        this.setState({stars: stars2}, function () {
            console.log(this.state.stars, "stars from this page")
        })
    }

    render() {
        if (this.state.loading === 'initial') {
            return (
                <div>
                    <Spinner color="danger" style={{width: '30rem', height: '30rem'}}/>
                </div>
            );
        }


        if (this.state.loading === 'true') {
            return (
                <div>
                    <Spinner color="black"/>
                </div>
            );
        }

        return (
            <Container fluid>
                <Row>
                    <Col xl={3}>
                        <FilterBar
                            updateMethod={this.updateState}
                            products={this.state.Products}
                            maxPrice={this.state.maxPrice}
                            stars={this.state.stars}
                        />
                    </Col>
                    <Col xl={9} style={{marginTop: '-120px'}}>
                        <Row>
                            {
                                this.state.newProductList.map((element, index) => {
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
CategoryPage.contextType = GlobalContext
export default CategoryPage;