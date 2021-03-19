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
        const slides = this.state.items.map((item) => {
            return (
                <CarouselItem
                    onExiting={() => this.setState({animating : true})}
                    onExited={() => this.setState({animating : true})}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });
        return (
            <div>
                <Navbar color="white" light expand="md">
                    <NavbarBrand href="/"><h4>E commerce web app</h4></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Input type="text" name="text" id="searchBar" size="70" placeholder="what are you looking for?" />
                            </NavItem>


                        </Nav>
                        <Nav>
                            <NavItem>
                                hello username
                            </NavItem>
                        <UncontrolledDropdown>

                            <DropdownToggle caret style={otherDropDown}>
                                My account
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <div className="options">
                                        <i className="material-icons">person</i>
                                        <span>profile</span>
                                    </div>

                                </DropdownItem>
                                <DropdownItem>
                                    <div className="options">
                                    <i className="material-icons">payment</i>
                                        <span>payment</span>
                                    </div>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <div className="options">
                                    <i className="material-icons">list</i>
                                        <span>Orders</span>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                        <NavbarText>
                            <div className="cartBtn">
                                <i className="material-icons">local_grocery_store</i>
                            </div>
                        </NavbarText>
                    </Collapse>
                </Navbar>
                <Navbar className={'secondNav'}>
                    <Nav>
                        <NavItem>
                            <NavLink href="/components/">Computers</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Gaming</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Software</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Food</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav >
                            <DropdownToggle nav caret>
                                Cloths
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    men
                                </DropdownItem>
                                <DropdownItem>
                                    women
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    kids
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Navbar>
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
                            <Col>
                                <ShopItem/>
                            </Col>
                            <Col>
                                <ShopItem/>
                            </Col>
                            <Col>
                                <ShopItem/>
                            </Col>
                            <Col>
                                <ShopItem/>
                            </Col>
                            <Col>
                                <ShopItem/>
                            </Col>
                            <Col>
                                <ShopItem/>
                            </Col>
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
                            <Col>
                                <BrandsShop />
                            </Col>
                            <Col>
                                <BrandsShop />
                            </Col>
                            <Col>
                                <BrandsShop />
                            </Col>
                            <Col>
                                <BrandsShop />
                            </Col>
                            <Col>
                                <BrandsShop />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card  color={"white"}>
                    <CardHeader>
                        <h5>Most purchased computer components</h5>
                    </CardHeader>
                    <CardBody>

                        <Row>
                            <Col>
                                <ShopItem/>
                            </Col>
                            <Col>
                                <ShopItem/>
                            </Col>
                            <Col>
                                <ShopItem/>
                            </Col>
                            <Col>
                                <ShopItem/>
                            </Col>
                            <Col>
                                <ShopItem/>
                            </Col>
                            <Col>
                                <ShopItem/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card>
                <SimpleReactFooter
                    description={description}
                    title={title}
                    columns={columns}
                    linkedin="fluffy_cat_on_linkedin"
                    facebook="fluffy_cat_on_fb"
                    twitter="fluffy_cat_on_twitter"
                    instagram="fluffy_cat_live"
                    youtube="UCFt6TSF464J8K82xeA?"
                    pinterest="fluffy_cats_collections"
                    copyright="black"
                    iconColor="black"
                    backgroundColor="white"
                    fontColor="black"
                    copyrightColor="darkgrey"
                />
                </Card>
            </div>
        );
    }
}
const description = "According to wikipedia, the cat (Felis catus) is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family. A cat can either be a house cat, a farm cat or a feral cat; the latter ranges freely and avoids human contact.";
const title = "E commerce web app";
const columns = [
    {
        title: "Resources",
        resources: [
            {
                name: "About",
                link: "/about"
            },
            {
                name: "Careers",
                link: "/careers"
            },
            {
                name: "Contact",
                link: "/contact"
            },
            {
                name: "Admin",
                link: "/admin"
            }
        ]
    },
    {
        title: "Legal",
        resources: [
            {
                name: "Privacy",
                link: "/privacy"
            },
            {
                name: "Terms",
                link: "/terms"
            }
        ]
    },
    {
        title: "Visit",
        resources: [
            {
                name: "Locations",
                link: "/locations"
            },
            {
                name: "Culture",
                link: "/culture"
            }
        ]
    }
];
const otherDropDown = {
    background : 'transparent',
    color: 'black',
    border : 'none'}
LandingPage.contextType = GlobalContext
export default LandingPage;