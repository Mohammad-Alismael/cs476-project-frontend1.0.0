import React, {Component} from 'react';
import {Card, Container} from "reactstrap";
import ShoppingCartItems from "../Components/ShoppingCartItems";
import tmp2 from "../Images/2.png";
import axios from "axios";

class DeleteProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            productList : [],
            functions :[]
        };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.handleChildUnmount2 = this.handleChildUnmount2.bind(this);
    }

    loadProducts(){
        var self = this
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get('https://localhost:5001/api/products').then((res) => {
                    resolve(res.data)
                }).catch((error) => {
                    console.log(error)
                    alert("error happened fetching data")
                })
            })
        },500)
        return promise
    }

    componentDidMount() {
        this.loadProducts().then((data)=>{
            var newArray= data.filter((val)=>{
                return val['userId'] == sessionStorage.getItem("user_id")
            })
            this.setState({productList : [newArray]})
            console.log(newArray)
        })

    }

    handleChildUnmount(){
        var tmp = [...this.state.children]
        tmp[0] = false
        this.setState({children: [tmp]});
    }
    handleChildUnmount2(){
        var tmp = [...this.state.children]
        tmp[1] = false
        this.setState({renderChild: [tmp]});
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
            <Container>
                {
                    this.state.productList.map((val, index) => {
                       return( <ShoppingCartItems
                            srcImg={tmp2}
                            productName={val[index].productName}
                            price={val[index].price}
                            rating={val[index].rating}
                            brand={"dg"}
                            quantity={0}
                        />)
                    })
                }
            </Container>
        );
    }
}

export default DeleteProduct;