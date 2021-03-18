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
import tmp1 from '../Images/1.png';
import tmp2 from '../Images/2.png';
import tmp3 from '../Images/3.png';
class LandingPage extends Component {
    state ={
        isOpen : false,
        activeIndex : 0,
        animating : false,
        items : [
            {
                src: tmp1,
                altText: 'Slide 1',
                caption: 'Slide 1'
            },
            {
                src: tmp2,
                altText: 'Slide 2',
                caption: 'Slide 2'
            },
            {
                src: tmp3,
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

    previous = () => {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex :nextIndex});
    }

    goToIndex = (newIndex) => {
        if (this.state.animating) return;
        this.setState({activeIndex :newIndex});
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
                            <NavItem>
                                <NavLink href="/components/">Computers</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
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
                <Carousel
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
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
                    <CardImg style={{height : '200px'}}/>
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
                <CardFooter>
                    isn't finished
                </CardFooter>
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