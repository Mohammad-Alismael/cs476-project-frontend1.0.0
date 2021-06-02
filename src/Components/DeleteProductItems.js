import React, {Component} from 'react';
import Counter from "./Counter";
import ReactStars from "react-rating-stars-component";
import {Card, Col,CardBody,CardImg,Button,Row,FormGroup,Label,Input} from "reactstrap";
import axios from "axios";
import {toast} from "react-toastify";

class DeleteProductItems extends Component {
    state = {
        locker : true,
        productName:this.props.productName,
        price:this.props.price,
        brand:this.props.brand,
        description:this.props.description,
        category:this.givesType(this.props.category),

    }
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
    givesTypeString(category){
        switch (category) {
            case "CPU":
                return "1";
            case "GPU":
                return "2";
            case "Motherboard":
                return "3";
            case "Apple":
                return "4";
            case "Monitor":
                return "5";
        }
    }
    updateInfo = (e)=>{
        e.preventDefault();
        axios.post(`https://localhost:5001/api/products/update/${this.props.id}`,{
            "id": this.props.id,
            "userId": sessionStorage.getItem("user_id"),
            "productName": this.state.productName,
            "price": this.state.price,
            "description": this.state.description,
            "brand": this.state.brand,
            "category": this.givesTypeString(this.state.category),
            "picture": this.props.srcImg
        }).then((res)=>{
            console.log(res)
            window.location.reload();
        }).catch((error)=>{
            toast.error("error happened for updating data!!")
            console.log(error)
        })
    }
    updateSate = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name] : e.target.value})
    }
    render() {
        return (
            <Card className={"shoppingCartItems"}>
                <Row>
                    <Col xl={3} style={{borderRight: '1px solid black'}}>
                        <CardImg src={this.props.srcImg != null ? 'data:image/jpeg;base64,' + this.props.srcImg :"https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg" } height={"200px"} width={"240px"}alt={"product img"}/>
                        <Row style={{marginLeft: '12px'}}>
                        <ReactStars
                            count={5}
                            fullIcon={<i className="material-icons">star</i>}
                            emptyIcon={<i className="material-icons">star_border</i>}
                            size={24}
                            value={this.props.rating}
                            edit={false}
                            activeColor="#ffd700"
                        />      ({this.props.rating.toFixed(2)})
                        </Row>
                    </Col>
                    <Col xl={9}>
                        <CardBody>
                            <FormGroup>
                                <Label for="exampleEmail">brand</Label>
                                <Input type="text" name="brand"
                                       value={this.state.brand}
                                       disabled={this.state.locker}
                                       onChange={this.updateSate}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Product name</Label>
                                <Input type="text" name="productName"
                                       value={this.state.productName}
                                       disabled={this.state.locker}
                                       onChange={this.updateSate}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Price</Label>
                                <Input type="text" name="price"
                                       value={this.state.price}
                                       disabled={this.state.locker}
                                       onChange={this.updateSate}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">category</Label>
                                <Input type="select" name="category"
                                       disabled={this.state.locker}
                                       onChange={this.updateSate}>
                                    <option selected={this.givesType(this.props.category) == "CPU"}>CPU</option>
                                    <option selected={this.givesType(this.props.category) == "GPU"}>GPU</option>
                                    <option selected={this.givesType(this.props.category) == "Motherboard"}>Motherboard</option>
                                    <option selected={this.givesType(this.props.category) == "Apple"}>Apple</option>
                                    <option selected={this.givesType(this.props.category) == "Monitor"}>Monitor</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Description</Label>
                                <Input type="textarea" name="description"
                                       value={this.state.description}
                                       disabled={this.state.locker}
                                       onChange={this.updateSate}/>
                            </FormGroup>
                            <Button color={"danger"}  style={{marginTop: '475px',marginRight: '100px'}}onClick={this.deleteItem}>Remove</Button>
                            <Button color={'primary'} style={{margin : '20px 10px',float: 'right'}} onClick={this.updateInfo}>update info</Button>
                            <Button color={'primary'}  style={{margin : '20px 10px',float: 'right'}}
                                    onClick={()=> this.setState({locker : !this.state.locker})}>{this.state.locker ? "unlock" : "lock"}</Button>

                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default DeleteProductItems;