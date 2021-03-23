import React, {Component,Fragment} from 'react';
import { Route } from 'react-router-dom';
import {
    Card, CardBody, CardHeader, Col,
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle,
    Input,
    Nav,
    Navbar,
    NavbarBrand, NavbarText,
    NavbarToggler,
    NavItem, NavLink, Row,
    UncontrolledDropdown
} from "reactstrap";
import '../Pages/LandingPage'
import logo from '../Images/logo_cs476.png'
import SimpleReactFooter from "simple-react-footer";
class LayoutDefault extends Component {
    state = {
        isOpen: false,
        activeIndex: 0,
        animating: false
    }
    render() {
        return (
            <Fragment>
                <Navbar color="white" light expand="md">
                    <NavbarBrand href="/"><img id={'logo'} src={logo}/></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Input type="text" name="text" id="searchBar" size="70" placeholder="what are you looking for?" />
                            </NavItem>
                        </Nav>
                        <Nav>
                            <UncontrolledDropdown>
                                <DropdownToggle caret style={otherDropDown}>
                                    {true ? "hello username" : "My account"}
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
                                    <DropdownItem/>
                                    <DropdownItem>
                                        <div className="options">
                                            <i className="material-icons">list</i>
                                            <span>Orders</span>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href={'/logout'}>
                                        <div className="options">
                                            <i className="material-icons">logout</i>
                                            <span>logout</span>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <NavbarText>
                            <div className="cartBtn">
                                <span>Cart</span>
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
                <Route {...this.props} />
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

            </Fragment>
        );
    }
}
const description = "From the perspective of server-side website deployment, there are two types of web pages: static and dynamic. Static pages are retrieved from the web server's file system without any modification,[3] while dynamic pages must be created by the server on the fly, typically drawing from a database to fill out a web template, before being sent to the user's browser.";
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
export default LayoutDefault;