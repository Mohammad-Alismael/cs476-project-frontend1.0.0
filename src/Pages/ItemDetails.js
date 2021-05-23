import React, {Component} from 'react';
import {
    Card, CardImg, Col, Row
    , FormGroup, Label, Input, Button,
    CardBody, CardHeader, Spinner,
} from "reactstrap";
import tmp1 from '../Images/1.png';
import '../Pages/css/ItemDetails.css'
import '../Pages/css/LandingPage.css';
import ReactStars from "react-rating-stars-component";

import axios from "axios";
import GlobalContext from "../GlobalContext";
import Comments from "../Components/Comments";
import {toast} from "react-toastify";
import Campaigns from "../Components/Campaigns";

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
        picture : "",
        quantity: 1,
        quantityAr: [],
        currentComment : [
            {
                username: sessionStorage.getItem("username"),
                text: "",
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

                this.context.fetchProducts(this.state.item_id)
                    .then(function (response) {
                        console.log("Ff",response)
                        const {description,price,brand,rating,productName,picture,quantity} = response;
                        var tmp = {}
                        tmp.description = description
                        tmp.price = price
                        tmp.brand = brand == null ? "no brand" : brand;
                        tmp.rate = rating;
                        tmp.quantity = quantity;
                        tmp.name = productName;
                        tmp.picture = picture
                        resolve(tmp);
                    }).catch(function (error) {
                    toast.error("error happened fetching product data")
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
                const {name,description,price,rate,brand,picture,quantity} = data
                this.setState({name})
                this.setState({price})
                this.setState({rate})
                this.setState({brand})
                // this.setState({quantity})
                this.setState({picture})
                this.setState({description})
                this.setState({
                    loading: 'false'
                });

                this.loadQuantity(quantity)
                console.log(this.state, "checking options")
            });

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
    addComment = (e)=>{
        var self = this;
        e.preventDefault()
        if(sessionStorage.getItem("userType") != "Product Manager") {
            axios.post(`https://localhost:5001/api/comments/add`, {
                "userID": sessionStorage.getItem("user_id").toString(),
                "userName": sessionStorage.getItem("username"),
                "productID": self.state.item_id.toString(),
                "commentDescription": self.state.currentComment[0].text,
                "rating": self.state.currentComment[0].rate,
                "approvedStatus": 1,
                "AddedDate": this.getDate()
            }).then((res) => {
                this.setState({comments: [...self.state.comments, self.state.currentComment[0]]})

            }).catch(function (error) {
                toast.info("you cannot add more than one comment!")
                console.log(error.message);
            })
        }else{
            toast.info("you can't add comments ")
        }

    }
    addItemCart = (e) =>{
        e.preventDefault()
        if(!this.context.cartItems.some(item => item.productName === this.state.name)){
            this.context.fetchProducts(this.state.item_id).then((data)=>{
                axios.post(`https://localhost:5001/api/carts/add`, {
                    "userId": parseInt(sessionStorage.getItem("user_id")),
                    "product": this.state.item_id,
                    "quantity" : this.state.quantity
                }).then((res)=>{
                    this.context.addItemCart(data,this.state.quantity)
                    // to make the cart up to date
                    this.context.setCartItems()
                }).catch((error) => {
                    console.log(error)
                    toast.error("error happened while adding product to cart")
                })

            })
        }else{
            // this part for the product if the product exists in cart or not
            var newQnty = this.state.quantity+this.countOldQnty();
            if(newQnty <= this.state.quantityAr.length) {
                axios.post(`https://localhost:5001/api/carts/update/${this.state.item_id}/${parseInt(sessionStorage.getItem("user_id"))}/${newQnty}`)
                    .then((res) => {
                        // to make the cart up to date
                        this.context.setCartItems()
                    }).catch((error) => {
                    console.log(error)
                    toast.error("error happened while changing the quantity fro global")
                })
            }else {
                toast.info("you can't buy more than the stock")
            }
        }

    }

    countOldQnty(){
        var oldQnty = 0;
        this.context.cartItems.map((val,index)=>{
            if (val.id == this.state.item_id){
                oldQnty  = val.chosenQuantity
            }
        })
        return oldQnty
    }
    loadQuantity(quantity){
        for (let i = 1; i <= quantity; i++) {
            this.setState({quantityAr: [...this.state.quantityAr, <option>{i}</option>]})
        }
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
                <CardImg src={'data:image/jpeg;base64,' + this.state.picture}/>
                </Col>
                <Col xl={(sessionStorage.getItem('userType') == "Sales Manager") ? 4 : 8}>
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
                            <Input type="select" name="select" id="exampleSelect"
                                onChange={(e)=> {this.setState({quantity : parseInt(e.target.value)})}}>
                                {
                                    this.state.quantityAr
                                }
                            </Input>
                        </FormGroup>

                        <Button id={'btn'} onClick={this.addItemCart}>Add To Cart</Button>
                    </div>
                </Col>
                    <Col xl={4}>
                        {
                            (sessionStorage.getItem('userType') == "Sales Manager") ?
                                (<Campaigns productId={this.state.item_id}/>) : null
                        }
                    </Col>
                </Row>
                <Row className={'RowDiv d-none'}>
                    <Col>
                        <Card className={'granteeCard'}>
                            <i className="material-icons">monetization_on</i>
                            <h5>100% Original</h5>
                            <p>Chocolate bar candy canes ice cream toffee cookie halvah.</p>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={'granteeCard'} >
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
                    <h4 style={{margin: '30px'}}>Latest Comments</h4>
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