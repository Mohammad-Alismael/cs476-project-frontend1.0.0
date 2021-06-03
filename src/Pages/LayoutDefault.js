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
import {toast} from "react-toastify";
import addNotification from "react-push-notification";
import NotificationItem from "../Components/NotificationItem";

class LayoutDefault extends Component {
    state = {
        isOpen: false,
        activeIndex: 0,
        animating: false,
        searchTerm : "",
        productNames : [],
        productDescription : [],
        notifications: [],
        notificationOpener : false,
        newNotifications: -1
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
                    // console.log(this.state.productNames)
                })
                // console.log(this.state.productNames)
            }).catch((error)=>{
                alert('fetching data error')
                console.log(error)
            })
        },500)
        this.loadNotifications();

        this.context.setCartItems()

    }
    countNewNotifications(){
        let counter = 0;
        this.state.notifications.map((val)=>{
            if (val.data.seen == 0)
                counter++;
        })
        return counter;
    }

    loadNotifications(){
        axios.get(`https://localhost:5001/api/notification/getByUser/${parseInt(sessionStorage.getItem('user_id'))}`)
            .then((res)=>{
                console.log('notification',res.data)
                res.data.map((val,index)=>{
                    if (val.seen != 1) {
                        const tmp = {}
                        tmp.data = val;
                        tmp.campaignData = "";
                        tmp.productData = "";
                        loadCampaignsData(val.notificationId).then((campaignData) => {
                            tmp.campaignData = campaignData
                            this.context.fetchProducts(campaignData.productId).then((productData) => {
                                tmp.productData = productData;
                            })
                        })
                        addNotification({
                            title: 'New coupons',
                            subtitle: 'This is a subtitle',
                            message: 'new coupons have been added',
                            theme: 'darkblue',
                            native: true // when using native, your OS will handle theming.
                        });
                        this.setState({notifications: [...this.state.notifications, tmp]})
                    }
                })
                this.setState({newNotifications: this.countNewNotifications()})
        })

        function loadCampaignsData(campaignId) {
            return new Promise((resolve, reject) => {
            axios.get(`https://localhost:5001/api/campaign`)
                .then((res)=>{

                    var tmp = res.data.filter((val)=>{
                        if (val.id == campaignId) {
                            return val
                        }
                    })
                    resolve(tmp[0])
                }).catch((error)=>{
                alert('fetching data error campaignId')
                console.log(error)
                resolve([])
            })
            })
        }
    }
    renderElement() {
        if (sessionStorage.getItem("userType") == "Customer") {
            return (
                <NavItem>
                    <DropdownItem href={"/fund-page"}>
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
                    <DropdownItem divider/>
                </NavItem>
            );
        } else if (sessionStorage.getItem("userType") == "Product Manager"){
            return (
                <NavItem>
                    <DropdownItem href={"/product-owner-landing-page/add-products"}>
                        <div className="options">
                            <i className="material-icons">create</i>
                            <span>add products</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem href={"/product-owner-landing-page/delete-products"}>
                        <div className="options">
                            <i className="material-icons">edit</i>
                            <span>edit products</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem divider/>
                </NavItem>
            )
    }
        else if (sessionStorage.getItem("userType") == "Sales Manager") {
            return (
                <NavItem>
                    <DropdownItem href={"/product-owner-landing-page/delete-products"}>
                        <div className="options">
                            <i className="material-icons">delete_sweep</i>
                            <span>Invoices</span>
                        </div>
                    </DropdownItem>
                </NavItem>
            );
        }
        return null;
    }
    toggle =() =>{
        this.setState({isOpen: !this.state.isOpen})
    }

    notification = (e) =>{
        e.preventDefault()
        this.setState({notificationOpener: !this.state.notificationOpener})
    }

    readAllNotifications = (e)=> {
        e.preventDefault()
        this.state.notifications.map((val,index)=>{
            axios.post('https://localhost:5001/api/notification/change',{
                "id": val.data.id,
                "notificationId": val.data.notificationId,
                "userId": val.data.userId,
                "seen": 1
            }).then(()=>{
            }).catch((error)=>{
                console.log(error)
                toast.info('error happened while reading all notifications')
            })
        })

        this.setState({notifications: []})


    }

    render() {
        return (
            <Fragment>
                <Navbar color="white"  expand="md" className={"navbar fixed-top"}>
                    <NavbarBrand href={sessionStorage.getItem('userType') == "Sales Manager" ? "/dashBoard" : "/"}><img id={'logo'} src={logo} className="mr-auto"/></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} >
                        <i className="material-icons mr-2" style={{font: '4rem'}}>dehaze</i>
                    </NavbarToggler>
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
                                        }else if(val[0].productName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                                            val[0].description.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
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
                            <NavItem>
                                <NavbarText>
                                    <div className="cartBtn2" onClick={this.notification}>
                                        <span className={"numberNotification"} data-units={this.state.notifications.length}>
                                            <i className="material-icons numberNotification">notifications</i>
                                        </span>
                                    </div>
                                </NavbarText>
                            </NavItem>
                            <div className={'notificationItems'} style={{display : this.state.notificationOpener ?  "block" : "none"}}>
                                <div id={'upperDiv'}>
                                    <p>{this.state.notifications.length} New</p>
                                    <p>App Notifications</p>
                                </div>
                                <div className={'middleDiv'}>
                                    {
                                        this.state.notifications.map((val,index)=>{
                                            return (
                                                <NotificationItem
                                                    id={val.data.id}
                                                    title={"New Coupon"}
                                                    productName={val.productData.productName}
                                                    seen={val.data.seen}
                                                    // endTime={val.campaignData.endDate}
                                                    description={val.campaignData.description}
                                                />
                                            )
                                        })
                                    }

                                </div>
                                <div id={'lowerDiv'}>
                                    <span onClick={this.readAllNotifications}>Read All notifications</span>
                                </div>
                            </div>
                            <NavItem>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret style={otherDropDown}>
                                        {sessionStorage.getItem('isLoggedIn') == "true"  ? `hello ${sessionStorage.getItem('username')}` : "My account"}
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
                            </NavItem>
                        <NavItem>
                            <NavbarText>
                                <div className="cartBtn" onClick={()=> this.nextPath('/shopping-cart')}>
                                    <span className={"number"} data-units={this.context.shoppingCard}>Cart</span>
                                    <i className="material-icons">local_grocery_store</i>
                                </div>
                            </NavbarText>
                        </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Navbar className={'secondNav'} style={{width: '111%'}}>
                    <Nav>
                        <NavItem>
                            <NavLink href={'/computers/gpu'}>Gpu</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={'/computers/cpu'}>Cpu</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={'/computers/motherboards'}>Motherboards</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={'/computers/apple'}>Apple</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={'/computers/monitors'}>Monitors</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <Route {...this.props} />
                <footer class="page-footer font-small teal pt-4" style={{background: 'white',width: '111%'}}>
                    <div class="container-fluid text-center text-md-left">
                        <div class="row">
                            <div class="col-md-6 mt-md-0 mt-3">
                                <h5 class="text-uppercase font-weight-bold">best web app</h5>
                                <p>Ecommerce software by PHP programmers matter</p>

                            </div>
                            <hr class="clearfix w-100 d-md-none pb-3"/>
                                <div class="col-md-6 mb-md-0 mb-3">
                                    <h5 class="text-uppercase font-weight-bold">Ecommerce software by</h5>
                                    <p>PHP progrmamers matter</p>
                                </div>
                        </div>
                    </div>
                    <div class="footer-copyright text-center py-3">© 2020 Copyright
                        <a href="https://mdbootstrap.com/"></a>
                    </div>
                </footer>
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