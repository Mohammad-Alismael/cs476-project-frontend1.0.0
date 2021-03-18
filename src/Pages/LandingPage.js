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
    Input, Container, Card, CardHeader, CardBody,Row,Col
} from 'reactstrap';
import ShopItem from "../Components/ShopItem";
class LandingPage extends Component {
    state ={
        isOpen : false
    }

    toggle(){
        this.setState({isOpen : !this.state.isOpen})
    }
    render() {
        return (
            <div>
                <Navbar color="white" light expand="md">
                    <NavbarBrand href="/"><h5>E commerce web app</h5></NavbarBrand>
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
                        <UncontrolledDropdown>
                            <span>username</span>
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

                <Card color={"white"}>
                    <CardHeader>
                        <h6>Recommended for you</h6>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
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