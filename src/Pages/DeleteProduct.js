import React, {Component} from 'react';
import {Card, Container} from "reactstrap";
import ShoppingCartItems from "../Components/ShoppingCartItems";
import tmp2 from "../Images/2.png";

class DeleteProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            childern : [true,true]
        };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
    }
    handleChildUnmount(){
        this.setState({renderChild: false});
    }
    render() {
        return (
            <Container>
                {this.state.renderChild ?
                <ShoppingCartItems
                    productName={"msi"}
                    price={2000}
                    brand={"microsoft"}
                    rating={1}
                    quantity={10}
                    srcImg={tmp2}
                    unmountMe={this.handleChildUnmount}
                /> : null }
                {this.state.renderChild ?
                    <ShoppingCartItems
                        productName={"msi"}
                        price={2000}
                        brand={"microsoft"}
                        rating={1}
                        quantity={10}
                        srcImg={tmp2}
                        unmountMe={this.handleChildUnmount}
                    /> : null }
            </Container>
        );
    }
}

export default DeleteProduct;