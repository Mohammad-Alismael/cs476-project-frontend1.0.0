import React, {Component,Fragment} from 'react';
import {Route, withRouter} from 'react-router-dom';
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
import '../Pages/css/LandingPage.css'
import '../Pages/LandingPage'
import logo from '../Images/logo_cs476.png'
import SimpleReactFooter from "simple-react-footer";
import GlobalContext from "../GlobalContext";
import RegisterForm from "./RegisterForm";
import axios from "axios";
class LayoutDefault extends Component {
    state = {
        isOpen: false,
        activeIndex: 0,
        animating: false,
        searchTerm : "",
        productNames : [],
        productDescription : []
    }
    nextPath(path) {
        this.props.history.push(path);
    }
    componentDidMount() {
        setTimeout(()=>{
            axios.get('https://localhost:5001/api/products').then((res)=>{
                res.data.map((val,key)=>{
                    this.setState({
                        productNames : [...this.state.productNames,[val]]
                    })
                    console.log(this.state.productNames)
                })
                console.log(this.state.productNames)
            }).catch((error)=>{
                alert('fetching data error')
                console.log(error)
            })
        },500)

    }
    renderElement(){
        if(sessionStorage.getItem("userType") == "Customer"){
            return (
                <>
                    <DropdownItem>
                        <div className="options">
                            <i className="material-icons">payment</i>
                            <span>payment</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem>
                        <div className="options">
                            <i className="material-icons">list</i>
                            <span>Orders</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem divider />
                </>
            );
        } else if(sessionStorage.getItem("userType") == "Product owner")
            return (
                <>
                    <DropdownItem href={"/product-owner-landing-page/add-products"}>
                        <div className="options">
                            <i className="material-icons">create</i>
                            <span>add products</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem href={"/product-owner-landing-page/edit-products"}>
                        <div className="options">
                            <i className="material-icons">edit</i>
                            <span>edit products</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem href={"/product-owner-landing-page/delete-products"}>
                        <div className="options">
                            <i className="material-icons">delete_sweep</i>
                            <span>delete products</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem divider />
                </>
            );
        return null;
    }
    render() {
        return (
            <Fragment>
                <Navbar color="white" light expand="md" style={{width: '111%',marginTop:'-70px'}}>
                    <NavbarBrand href="/"><img id={'logo'} src={logo}/></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Input type="text" name="text" id="searchBar" size="70"
                                        onChange={(event)=>{
                                            this.setState({searchTerm: event.target.value})
                                            console.log(this.state.searchTerm)
                                        }}
                                       placeholder="what are you looking for?" />
                            </NavItem>
                            <div className={'filteredItems'} style={{display : this.state.searchTerm == "" ?  "none" : "block"}}>
                                {
                                    this.state.productNames.filter((val)=>{
                                        if (this.state.searchTerm == ""){
                                            return val
                                        }else if(val[0].productName.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
                                            return val
                                        }
                                    }).map((val,key)=>{
                                        return (

                                                <p id={'searchedItem'}
                                                   data-id={val[0].id}
                                                   data-productName={val[0].productName}
                                                   onClick={(event)=>{
                                                       this.state.searchTerm = ""
                                                       document.getElementById('searchBar').value =
                                                           val[0].productName
                                                       console.log(event.target.dataset.id)
                                                       this.nextPath(`/item-details/${event.target.dataset.id}`)
                                                       window.location.reload(false);
                                                   }}
                                                >{val[0].productName}</p>
                                           )
                                    })
                                }
                            </div>
                        </Nav>

                        <Nav>
                            <NavbarText>
                                <div className="cartBtn2">
                                    <i className="material-icons">notifications</i>
                                </div>
                            </NavbarText>
                            <UncontrolledDropdown>
                                <DropdownToggle caret style={otherDropDown}>
                                    {this.context.IsLoggedIn  ? `hello ${this.context.username}` : "My account"}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem href={'/profile-settings'}>
                                        <div className="options">
                                            <i className="material-icons">person</i>
                                            <span>profile</span>
                                        </div>
                                    </DropdownItem>
                                    {this.renderElement()}
                                    <DropdownItem href={'/login'}>
                                        <div className="options">
                                            <i className="material-icons">logout</i>
                                            <span>logout</span>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <NavbarText>
                            <div className="cartBtn" onClick={()=> this.nextPath('/shopping-cart')}>
                                <span className={"number"} data-units={this.context.shoppingCard}>Cart</span>
                                <i className="material-icons">local_grocery_store</i>
                                {/*<label ID="lblCartCount" runat="server" CssClass="badge badge-warning"  ForeColor="White"/>{this.context.shoppingCard}*/}
                            </div>
                        </NavbarText>
                    </Collapse>
                </Navbar>
                <Navbar className={'secondNav'} style={{width: '111%'}}>
                    <Nav>
                        <NavItem>
                            <UncontrolledDropdown nav >
                                <DropdownToggle nav caret>
                                    Computers
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem href={'/computers/gpu'}>
                                        Gpu
                                    </DropdownItem>
                                    <DropdownItem href={'/computers/cpu'}>
                                        Cpu
                                    </DropdownItem>
                                    <DropdownItem href={'/computers/motherboards'}>
                                        Motherboards
                                    </DropdownItem>
                                    <DropdownItem href={'/computers/apple'}>
                                        Apple
                                    </DropdownItem>
                                    <DropdownItem href={'/computers/monitors'}>
                                        Monitors
                                    </DropdownItem>
                                    <DropdownItem>
                                        Mouse & keyboard
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
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
                <Card style={{width: '111%'}}>
                    <SimpleReactFooter
                        style={{position:'sticky',bottom: "0px"}}
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
                        backgroundColor='white'
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
    marginTop : '13px',
    border : 'none'}
LayoutDefault.contextType = GlobalContext
export default withRouter(LayoutDefault);