import React, {Component} from 'react';
import {Card, Container, Spinner} from "reactstrap";
import ShoppingCartItems from "../Components/ShoppingCartItems";
import tmp2 from "../Images/2.png";
import axios from "axios";
import DeleteProductItems from "../Components/DeleteProductItems";

class DeleteProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: 'initial',
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
        this.setState({ loading: 'true' });
        this.loadProducts().then((data)=>{
            const newArray = data.filter((val) => {
                return val['userId'] == sessionStorage.getItem("user_id")
            });
            this.setState({productList : [newArray]})
            this.setState({
                loading: 'false'
            });
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
            <Container>
                {
                    this.state.productList[0].map((val, index) => {
                       return(
                           <DeleteProductItems
                               id={val.id}
                                srcImg={tmp2}
                                productName={val.productName}
                                description={val.description}
                               category={val.category}
                                price={val.price}
                                rating={val.rating}
                                brand={"no brand"}
                        />

                        )
                    })
                }
            </Container>
        );
    }
}

export default DeleteProduct;