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
import classNames from "classnames";
import axios from "axios";
class ItemDetails extends Component {
    state = {
        activeTab : 1,
        item_id : this.props.match.params.item_id,
        name : "Apple watch",
        description: "Apple Watch is a line of smart watches produced by Apple Inc. It incorporates fitness tracking, health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple products and services.\n" +
            "\n" +
            "The Apple Watch was released in April 2015[30][31] and quickly became the best-selling wearable device: 4.2 million were sold in the second quarter of fiscal 2015,[32][33] and more than 100 million people were estimated to use an Apple Watch as of December 2020.[34] Apple has introduced new generations of the Apple Watch with improved internal components each September —each labeled by Apple a 'Series', with certain exceptions.",
        rate : 3,
        stars: [],
        price : '999',
        brand : 'Apple',
        loading: 'initial',
        percentageRating :[
            34,
            23,
            12,
            89,
            99
        ],
        comments :[
            {
                username: "ali",
                text : "comment1",
                date: "10/02/2020",
                rate: 2,
                status: "pending"
            },
            {
                username: "ali2",
                text : "comment2 comment2 comment2 comment2 comment2 comment2" +
                    "The Apple Watch was released in April 2015[30][31] and quickly became the ",
                date: "17/05/2020",
                rate: 3,
                status: "approved"
            },
            {
                username: "ali2",
                text : "comment2 comment2 comment2 comment2 comment2 comment2" +
                    "The Apple Watch was released in April 2015[30][31] and quickly became the " +
                    "The Apple Watch was released in April 2015[30][31] and quickly became the  " +
                    "The Apple Watch was released in April 2015[30][31] and quickly became the",
                date: "17/05/2020",
                rate: 3,
                status: "approved"
            }
        ]
    }
    loadData() {
        var self = this
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get(`https://localhost:5001/api/comments/${5}`)
                    .then(function (response) {
                        // handle success
                        // {
                        //     username: "ali",
                        //         text : "comment1",
                        //     date: "10/02/2020",
                        //     rate: 2,
                        //     status: "pending"
                        // }
                        // {
                        //     "id": 5,
                        //     "userID": "1",
                        //     "productID": "5",
                        //     "commentDescription": "So bad",
                        //     "rating": 1,
                        //     "approvedStatus": 1
                        // },

                        response.data.map((element,index)=>{
                            var tmp ={}
                            tmp.username = element.id
                            tmp.text = element.commentDescription
                            tmp.rate = element.rating
                            tmp.status = element.approvedStatus === 0 ? "approved" : "pending"
                            self.setState({comments : [...self.state.comments, tmp]})
                        })

                        // console.log(response,"k");
                    })
                    .catch(function (error) {
                        alert("error happened!!")
                        console.log(error);
                    })
                resolve('This is my data.');
            }, 500);
        });

        return promise;
    }
    componentDidMount() {
        var self = this;
        this.setState({ loading: 'true' });


        this.loadData()
            .then((data) => {
                for (var i=0; i < this.state.rate; i++){
                    this.setState({stars : [...this.state.stars, <i className="material-icons ratingStars">star</i>]})
                }
                for (var j=0; j < 5 - this.state.rate; j++){
                    this.setState({stars : [...this.state.stars, <i className="material-icons ratingStars">star_border</i>]})
                }
                this.setState({
                    loading: 'false'
                });
            });
        console.log(this.state.stars)
    }

    ratingsBars(stars,percentage){
        return (
            <div className={'ratingBars'}>
                <p>{stars} stars</p>
                <p>{percentage}%</p>
                <Progress min={0} max={100} value={percentage} style={{width: '50%',marginLeft: '60px'}}/>

            </div>
        )
    }
    ratingChanged = (newRating) => {
        console.log(newRating);
    };
    loadingComments(username,text,rate,date,status){
        return(
        <div className="comment">
            <p>{username}</p>
            <p>{date}</p>
            <p>{text}</p>
            <p>{status}</p>
            <ReactStars
                count={5}
                fullIcon={<i className="material-icons">star</i>}
                emptyIcon={<i className="material-icons">star_border</i>}
                onChange={this.ratingChanged}
                size={24}
                value={rate}
                edit={false}
                classNames={"stars"}
                activeColor="#ffd700"
            />
        </div>
        )
    }
    render() {
        if (this.state.loading === 'initial') {
            return (
                <div>
                    <Spinner color="danger" />
                </div>
            );
        }



        if (this.state.loading === 'true') {
            return (
                <div>
                    <Spinner color='rgb(120,60,237)' />
                </div>
            );
        }
        return (
            <Card body>
                <Row>
                <Col xl={4}>
                <CardImg src={tmp1}/>
                </Col>
                <Col xl={8}>
                    <div className={'details'}>
                        <h3>{this.state.name}</h3>
                        <h6>{this.state.brand}</h6>
                        <h4>{this.state.price}$</h4>
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

                        <Button id={'btn'}>Add To Cart</Button>
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
                    <Col xl={3}>
                        <div className="addComments">
                            <h4>Customer & Reviews</h4>
                            <div style={{marginBottom: '20px'}}>
                                {this.state.stars}
                            </div>
                            <div>
                                {
                                    this.state.percentageRating.map((element,index)=>{
                                       return ( this.ratingsBars(index+1,element))
                                    })
                                }
                            </div>
                        </div>
                        <div></div>
                    </Col>
                    <Col xl={9}>
                        <div className="addComments">
                            <div>
                                {
                                    this.state.comments.map((element,index)=>{
                                        return ( this.loadingComments(element.username,
                                            element.text,element.rate,element.date,element.status
                                        ))
                                    })
                                }
                            </div>
                        </div>
                        <FormGroup>
                            <Input type="textarea" name="text" id="exampleText"
                            placeholder="let us hear your opinion..."
                           style={{height: '100px'}}/>
                        </FormGroup>
                        <Button id={'btn'} onClick={()=>(console.log(this.state.comments))}>Add Comment</Button>

                    </Col>
                </Row>
            </Card>
        );
    }
}

export default ItemDetails;