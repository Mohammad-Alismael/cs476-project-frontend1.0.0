import React, {Component} from 'react';
import GlobalContext from "../GlobalContext";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Input, Container, Card, CardHeader, CardBody, Row, Col,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption, CardImg,CardFooter
} from 'reactstrap';

import ShopItem from "../Components/ShopItem";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import tmp1 from '../Images/1.png';
import tmp2 from '../Images/2.png';
import tmp3 from '../Images/3.png';
import ImageBanner from '../Images/tmp.jpeg'
import BrandsShop from "../Components/BrandsShop";
import SimpleReactFooter from "simple-react-footer";
class LandingPage extends Component {
    state ={
        isOpen : false,
        activeIndex : 0,
        animating : false,
        items : [
            {
                src: 'https://www.gogits.com/images/slider3.jpg',
                altText: 'Slide 1',
                caption: 'Slide 1'
            },
            {
                // src: 'https://cdn3.mageplaza.com/media/general/MImGnKu.png',
                src: 'https://www.gogits.com/images/slider3.jpg',
                altText: 'Slide 2',
                caption: 'Slide 2'
            },
            {
                src: 'https://www.gogits.com/images/slider3.jpg',
                altText: 'Slide 3',
                caption: 'Slide 3'
            }
        ],
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
            },
            {
                price : 400,
                name : "Apple watch",
                item_id : 12,
                srcImg : tmp1
            }
        ]
    }

    toggle(){
        this.setState({isOpen : !this.state.isOpen})
    }

    next = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex :nextIndex});
    }

    render() {
        return (
            <div>
                <Card>
                <div className="slide-container">
                    <Slide easing="ease">
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${this.state.items[0].src})`}}>

                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url('https://cdn3.mageplaza.com/media/general/MImGnKu.png')`}}>

                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{'backgroundImage': `url(${this.state.items[0].src})`}}>

                            </div>
                        </div>
                    </Slide>
                </div>
                </Card>
                <Card color={"white"}>
                    <CardHeader>
                        <h5>Recommended for you</h5>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            {
                                this.state.recommendationProducts.map((element,index)=>(
                                    <Col>
                                        <ShopItem price={element.price} productName={element.name} key={index}
                                                  item_id={element.item_id} srcImg={element.srcImg} rate={3}/>
                                    </Col>
                                ))
                            }
                        </Row>
                    </CardBody>
                </Card>
                <Card >
                    <CardImg src={"https://jstechno.com/images/E-commerce%20Solutions.jpg"} style={{height : '200px'}}/>
                </Card>
                <Card  color={"white"}>
                    <CardHeader>
                        <h5>Brands we have</h5>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            {
                                this.state.recommendationProducts.map((element,index)=>(
                                    <Col>
                                        <BrandsShop brandName={element.name} srcImg={element.srcImg}/>
                                    </Col>
                                ))
                            }
                        </Row>
                    </CardBody>
                </Card>
                <Card  color={"white"}>
                    <CardHeader>
                        <h5>Most purchased computer components</h5>
                    </CardHeader>
                    <CardBody>

                        <Row>
                            <Row>
                                {
                                    this.state.recommendationProducts.map((element,index)=>(
                                        <Col>
                                            <ShopItem price={element.price} productName={element.name}
                                                      item_id={element.item_id} srcImg={element.srcImg} rate={3}/>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const otherDropDown = {
    background : 'transparent',
    color: 'black',
    border : 'none'}
LandingPage.contextType = GlobalContext
export default LandingPage;