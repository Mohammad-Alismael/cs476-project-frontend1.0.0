import React, {Component} from 'react';
import {
    Card, CardImg, Col, Row
    , FormGroup, Label, Input, Button,
    CardTitle, CardBody, CardHeader, CardText, TabPane, TabContent, NavLink, NavItem, Nav, Container, Spinner, Progress
} from "reactstrap";
import tmp1 from '../Images/1.png';
import '../Pages/css/ItemDetails.css'
import '../Pages/css/LandingPage.css';
import ReactStars from "react-rating-stars-component";

import axios from "axios";
import GlobalContext from "../GlobalContext";
import Comments from "../Components/Comments";

class ItemDetails extends Component {
    state = {
        activeTab : 1,
        item_id : this.props.match.params.item_id,
        name : "Apple watch",
        description: "Apple Watch is a line of smart watches produced by Apple Inc. It incorporates fitness tracking, health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple products and services.\n" +
            "\n" +
            "The Apple Watch was released in April 2015[30][31] and quickly became the best-selling wearable device: 4.2 million were sold in the second quarter of fiscal 2015,[32][33] and more than 100 million people were estimated to use an Apple Watch as of December 2020.[34] Apple has introduced new generations of the Apple Watch with improved internal components each September —each labeled by Apple a 'Series', with certain exceptions.",
        rate : 0,
        stars: [],
        price : '',
        brand : 'Apple',
        loading: 'initial',
        seller: "seller",
        percentageRating :[
            34,
            23,
            12,
            89,
            99
        ],
        currentComment : [
            {
                username: sessionStorage.getItem("username"),
                text: "",
                // date: this.getDate(),
                rate: 0,
                status: "pending"
            }
        ],
        comments :[

        ]
    }
    getDate(){
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const dateObj = new Date();
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        const output = month  + '\n'+ day  + ',' + year;
        const output2 = `${day}/${month}/${year}`
        return output
    }
    loadData() {
        var self = this
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get(`https://localhost:5001/api/comments/${this.state.item_id}`)
                    .then(function (response) {
                        response.data.map((element,index)=>{
                            var tmp ={}
                            tmp.id = element.id
                            tmp.username = element.userName
                            tmp.date = element.addedDate == null ? "no date" : element.addedDate
                            tmp.text = element.commentDescription
                            tmp.rate = element.rating
                            tmp.status = element.approvedStatus
                            self.setState({comments : [...self.state.comments, tmp]})
                        })
                    })
                    .catch(function (error) {
                        alert("error happened!!")
                        console.log(error);
                    })
                axios.get(`https://localhost:5001/api/products/${this.state.item_id}`)
                    .then(function (response) {
                        console.log("Ff",response)
                        var tmp = {}
                        tmp.description = response.data.description
                        tmp.price = response.data.price
                        tmp.rate = response.data.rating
                        tmp.name = response.data.productName
                        resolve(tmp);
                    }).catch(function (error) {
                    alert("error happened!!")
                    console.log(error);
                })



            }, 500);
        });

        return promise;
    }

    componentDidMount() {
        this.setState({ loading: 'true' });

        this.loadData()
            .then((data) => {
                const {name,description,price,rate} = data
               console.log(data)
                this.setState({name})
                this.setState({price})
                this.setState({rate})
                this.setState({description})
                // this.setState({rate})
                this.setState({
                    loading: 'false'
                });
            });

    }

    ratingsBars(stars,percentage){
        return (
            <div className={'ratingBars'}>
                <p>{stars} stars</p>
                <p>{percentage}%</p>
                <Progress color="#61dafb" min={0} max={100} value={percentage} style={{width: '50%',marginLeft: '60px'}}/>
            </div>
        )
    }
    ratingChanged = (newRating) => {
        var tmp = {
        ...this.state.currentComment[0],
            rate: newRating
        }
        this.setState({currentComment: [tmp]}, function () {
            console.log(this.state.currentComment,newRating)
        });

    };
    loadingComments(username,text,rate,date,status){

    }
    addComment = (e)=>{
        var self = this;
        e.preventDefault()
        if(sessionStorage.getItem("userType") != "Product Manager") {
            axios.post(`https://localhost:5001/api/comments/add`, {
                "userID": sessionStorage.getItem("user_id").toString(),
                "userName": sessionStorage.getItem("username"),
                // "userID": "441",
                // "productID": self.state.item_id,
                "productID": self.state.item_id.toString(),
                "commentDescription": self.state.currentComment[0].text,
                "rating": self.state.currentComment[0].rate,
                "approvedStatus": 1,
                "AddedDate": this.getDate()
            }).then((res) => {
                this.setState({comments: [...self.state.comments, self.state.currentComment[0]]})

            }).catch(function (error) {
                alert("you cannot add more than one comment!")
                console.log(error.message);
            })
        }else{
            alert("you can't add comments ")
        }

    }
    addItemCart = (e) =>{
        e.preventDefault()
        this.context.fetchProducts(this.state.item_id).then((data)=>{
            // don't forget to add an api to add the item here
            axios.post(`https://localhost:5001/api/carts/add`, {
                "userId": parseInt(sessionStorage.getItem("user_id")),
                "product": this.state.item_id
            }).then((res)=>{
                this.context.addItemCart(data)
                this.context.setCartItems()
                // this.context.changeShoppingCard(this.context.cartItems.length + 1)
            }).catch((error) => {
                console.log(error)
                alert("error happened while adding product to cart")
            })

        })
    }
    render() {

        if (this.state.loading === 'initial') {
            return (
                <div>
                    <Spinner color="danger" style={{ width: '30rem', height: '30rem' }}/>
                </div>
            );
        }


        if (this.state.loading === 'true') {
            return (
                <div>
                    <Spinner color="black" style={{ width: '20rem', height: '20rem',marginLeft: '45%',marginTop: '10%',marginBottom: '10%' }}/>
                </div>
            );
        }
        return (
            <Card body style={{width: '111%'}}>
                <Row>
                <Col xl={4}>
                <CardImg src={tmp1}/>
                </Col>
                <Col xl={8}>
                    <div className={'details'}>
                        <h3>{this.state.name}</h3>
                        <ReactStars
                            count={5}
                            fullIcon={<i className="material-icons">star</i>}
                            emptyIcon={<i className="material-icons">star_border</i>}
                            onClick={this.ratingChanged}
                            size={24}
                            value={this.state.rate}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <h6>{this.state.brand}</h6>
                        <h4>{this.state.price}$</h4>
                        {/*<h4>{this.state.seller}</h4>*/}
                        <hr></hr>
                        <p>{this.state.description}</p>
                        <div className="options">
                            <i className="material-icons">local_shipping</i>
                            <span>Free shipping</span>
                        </div>
                        <div className="options">
                            <i className="material-icons">monetization_on</i>
                            <span>crypto currency support it</span>
                        </div>
                        <hr></hr>
                        <FormGroup style={{width: '7%'}}>
                            <Label for="exampleSelect">Quantity</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>

                        <Button id={'btn'} onClick={this.addItemCart}>Add To Cart</Button>
                    </div>
                </Col>
                </Row>
                <Row style={{background : 'rgb(248,248,248)'}}>
                    <Col>
                        <Card className={'granteeCard'}>
                            <i className="material-icons">monetization_on</i>
                            <h5>100% Original</h5>
                            <p>Chocolate bar candy canes ice cream toffee cookie halvah.</p>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={'granteeCard'}>
                            <i className="material-icons">access_time</i>
                            <h5>10 Day Replacement</h5>
                            <p>Marshmallow biscuit donut dragée fruitcake wafer.</p>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={'granteeCard'}>
                            <i className="material-icons">monetization_on</i>
                            <h5>1 Year Warranty</h5>
                            <p>Chocolate bar candy canes ice cream toffee cookie halvah.</p>
                        </Card>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    {/*<Col xl={3}>*/}
                    {/*    <div className="addComments">*/}
                            <h4 style={{margin: '30px'}}>Latest Comments</h4>
                    {/*        <div style={{marginBottom: '20px'}}>*/}

                    {/*        </div>*/}
                    {/*        /!*<div>*!/*/}
                    {/*        /!*    {*!/*/}
                    {/*        /!*        this.state.percentageRating.map((element,index)=>{*!/*/}
                    {/*        /!*           return ( this.ratingsBars(index+1,element))*!/*/}
                    {/*        /!*        })*!/*/}
                    {/*        /!*    }*!/*/}
                    {/*        /!*</div>*!/*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        /!*<img src={'https://smartyads.com/images/uploads/vertical-vs-horizontal-ad-strategy.png'} style={{height: '100%',width: '250px'}}/>*!/*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                    <Col xl={12}>
                        <div className="addComments">
                            <div>
                                {
                                    this.state.comments.map((element,index)=>{
                                        return (  <Comments
                                                    commentId={element.id}
                                                    username={element.username}
                                                    date={element.date}
                                                    rate={element.rate}
                                                    text={element.text}
                                                    userType={sessionStorage.getItem("userType")}
                                                    approved={element.status}
                                                    />)
                                    })
                                }
                            </div>
                        </div>
                        <Card>
                            <CardHeader tag={'h4'}>
                                Let us hear your opinion
                            </CardHeader>
                            <CardBody>
                                <ReactStars
                                    count={5}
                                    fullIcon={<i className="material-icons">star</i>}
                                    emptyIcon={<i className="material-icons">star_border</i>}
                                    onChange={this.ratingChanged}
                                    size={24}
                                    // value={0}
                                    edit={true}
                                    activeColor="#ffd700"
                                />
                                <FormGroup>
                                    <Input type="textarea" name="currentComment" id="exampleText"
                                    placeholder="add a comment..."
                                           onChange={(event)=>{
                                               var tmp = {
                                                   ...this.state.currentComment[0],
                                                   status : 1,
                                                   text: event.target.value
                                                   // text: document.getElementsByName('currentComment')[0].value
                                               }

                                               this.setState({currentComment:
                                               [tmp]
                                           })}}
                                   style={{height: '100px'}}/>
                                </FormGroup>
                                <Button id={'btn'} onClick={this.addComment}>Add Comment</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Card>

        );
    }
}
ItemDetails.contextType = GlobalContext
export default ItemDetails;