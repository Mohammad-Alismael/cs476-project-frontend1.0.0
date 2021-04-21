import React, {Component} from 'react';
import Counter from "./Counter";
import ReactStars from "react-rating-stars-component";
import {Card, Col,CardBody,CardImg,Button,Row} from "reactstrap";
import axios from "axios";

class DeleteProductItems extends Component {
    deleteItem = (e) =>{
        e.preventDefault();
        axios.post(`https://localhost:5001/api/products/delete/${this.props.id}`,{
            "Id": sessionStorage.getItem("user_id")
        }).then((res)=>{
            console.log(res)
            window.location.reload();
        }).catch((error)=>{
            alert("error happened!!")
            console.log(error)
        })

    }
    givesType(category){
        switch (category) {
            case "1":
                return "CPU";
            case "2":
                return "GPU";
            case "3":
                return "Motherboard";
            case "4":
                return "Apple";
            case "5":
                return "Monitor";
        }
    }
    render() {
        // "id": 8,
        //     "productName": "rtx4070",
        //     "price": 10,
        //     "description": "2022 made gpu",
        //     "category": "2",
        //     "rating": 3,
        //     "userId": 16
        return (
            <Card className={"shoppingCartItems"}>
                <Row>
                    <Col xl={3} style={{borderRight: '1px solid black'}}>
                        <CardImg src={this.props.srcImg} />
                    </Col>
                    <Col xl={9}>
                        <CardBody>
                            <ReactStars
                                count={5}
                                fullIcon={<i className="material-icons">star</i>}
                                emptyIcon={<i className="material-icons">star_border</i>}
                                size={24}
                                value={this.props.rating}
                                edit={false}
                                classNames={"DeleteItemsStars"}
                                activeColor="#ffd700"
                            />
                            <p>{this.props.brand} - {this.props.productName}</p>
                            <p>{this.props.price}$</p>
                            <p>{this.givesType(this.props.category)}</p>
                            <p>{this.props.description}</p>
                            <Button color={"danger"} style={{float: 'right',margin: '20px'}} onClick={this.deleteItem}>Remove</Button>

                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default DeleteProductItems;