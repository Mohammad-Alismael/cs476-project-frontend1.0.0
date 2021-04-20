import React, {Component} from 'react';
import {Card, Container} from "reactstrap";
import ShoppingCartItems from "../Components/ShoppingCartItems";
import tmp2 from "../Images/2.png";

class DeleteProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            children : [],
            functions :[]
        };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.handleChildUnmount2 = this.handleChildUnmount2.bind(this);
    }

    settingFunctionsForEachComponents() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(()=> {
                for (let i = 0; i < 1; i++) {
                    this.setState({children: [...this.state.children,true]});
                    var self = this;
                    var tmpFunc = function (index) {
                        const tmp = [...self.state.children];
                        tmp[0] = false
                        self.setState({children: [tmp]});
                    }
                    tmpFunc.bind(this)
                    this.setState({functions: [...this.state.functions,tmpFunc]});
                }
                resolve("f")
                },500)
            });

        return promise
    }

    componentDidMount() {
        this.settingFunctionsForEachComponents()
            .then((data)=>{
                console.log(this.state,"dd")
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
        return (
            <Container>
                {/*{this.state.children[0] ?*/}
                {/*<ShoppingCartItems*/}
                {/*    productName={"msi"}*/}
                {/*    price={2000}*/}
                {/*    brand={"microsoft"}*/}
                {/*    rating={1}*/}
                {/*    quantity={10}*/}
                {/*    srcImg={tmp2}*/}
                {/*    unmountMe={this.handleChildUnmount}*/}
                {/*/> : null }*/}
                {/*{this.state.children[1] ?*/}
                {/*    <ShoppingCartItems*/}
                {/*        productName={"msi"}*/}
                {/*        price={2000}*/}
                {/*        brand={"microsoft"}*/}
                {/*        rating={1}*/}
                {/*        quantity={10}*/}
                {/*        srcImg={tmp2}*/}
                {/*        unmountMe={this.handleChildUnmount2}*/}
                {/*    /> : null }*/}
                {/*{this.state.children[0] ?*/}
                {/*    <ShoppingCartItems*/}
                {/*            productName={"msi"}*/}
                {/*            price={2000}*/}
                {/*            brand={"microsoft"}*/}
                {/*            rating={1}*/}
                {/*            quantity={10}*/}
                {/*            srcImg={tmp2}*/}
                {/*            unmountMe={this.state.functions[0](0)}*/}
                {/*            /> : null}*/}
            </Container>
        );
    }
}

export default DeleteProduct;