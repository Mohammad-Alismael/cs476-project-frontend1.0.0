import React, {Component} from 'react';
import {Button, Card, CardBody, Col, Container, Input, InputGroup, Row} from "reactstrap";
import GlobalContext from "../GlobalContext";
import ShoppingCart from "./ShoppingCart";
import axios from "axios";
import {toast} from "react-toastify";
import {PDFDownloadLink, Document, Page, PDFViewer} from '@react-pdf/renderer'
import DownloadDocument from "./DownloadDocument";
class Checkout extends Component {
    state = {
        email: "",
        username: "",
        cartItems: this.context.cartItems

    }
    pay =(e) =>{
    e.preventDefault()

        this.getBalance().then((balance)=>{
            if (this.state.username == sessionStorage.getItem('username') &&
                this.state.email == sessionStorage.getItem('email')) {
                const fee = Math.round(this.context.priceAfterDisc) == 0 ?
                    Math.round(this.context.priceBeforeDisc) : Math.round(this.context.priceAfterDisc);
                if (fee <= balance) {
                    axios.post(`https://localhost:5001/api/finance/pay`, {
                        "customerID": parseInt(sessionStorage.getItem('user_id')),
                        "fee": fee
                    }).then((res) => {
                        this.context.cartItems.map((val, index) => {
                            this.addingProductsToDB(val)
                        })
                        this.context.emptyCartItems()
                        this.context.changeShoppingCard(0)
                        toast.success("successfully paid")
                    }).catch((error) => {
                        console.log(error)
                        toast.error("error happened while proceeding")
                    })
                }else {
                    toast.info("you don't have enough balance")
                }
            }else {
                if (this.state.username != sessionStorage.getItem('username')){
                    toast.info('username is incorrect')
                }else {
                    toast.info('email is incorrect')
                }
            }
        })

    }

    getBalance(){
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:5001/api/users/${parseInt(sessionStorage.getItem('user_id'))}`)
                .then((res) => {
                    console.log(res.data)
                    resolve(res.data.balance)
                }).catch((error) => {
                console.log(error)
                toast.error("error happened while fetching balance")
                resolve(-1)
            })
        })
    }
    addingProductsToDB(val){
            axios.post(`https://localhost:5001/api/sales/add`,{
                "productId": val.id,
                "userId": parseInt(sessionStorage.getItem('user_id')),
                "price": val.price,
                "amount":val.chosenQuantity
            }).catch((error) => {
                console.log(error)
                toast.error("error happened while adding products to db")
            })
    }
    updateSate = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name] : e.target.value})
    }
    componentDidMount() {
        console.log('mount',this.context.cartItems )
        this.setState({cartItems: this.context.cartItems})
    }

    render() {
        return (
            <Container style={{marginBottom: '20%'}}>
                <Row style={{background: 'white'}}>
                    <Col xl={9}>
                        <InputGroup style={{margin:'10px'}}>
                            <Input name="username" placeholder={"enter username for checking"}
                                   onChange={this.updateSate}/>
                        </InputGroup>
                        <InputGroup style={{margin:'10px'}}>
                            <Input name="email" placeholder={"enter email for checking"}
                                   onChange={this.updateSate}/>
                        </InputGroup>
                        <Button id={'btn'} size={'lg'} style={{width : '100%',margin: '10px'}}
                                onClick={this.pay}>proceed</Button>
                        <PDFDownloadLink document={<DownloadDocument cartItems={this.context.cartItems}/>} fileName="pdfInvoice.pdf">
                            {({ blob, url, loading, error }) => (
                                loading ? 'Loading document...' : <Button id={'btn'} size={'lg'} style={{width : '100%',margin: '10px'}}>Download Invoice</Button>)
                            }
                        </PDFDownloadLink>
                    </Col>
                    <Col xl={3}>
                        <Card body>
                            <p>Price before discount:     {(this.context.priceBeforeDisc).toFixed(2)}$</p>
                            <p>Discount:     {this.context.percentageDiscount}%</p>
                            <p>Price after discount:   {(this.context.priceAfterDisc).toFixed(2)}$</p>
                        </Card>
                    </Col>
                </Row>
                <div>

                    {/*<PDFViewer width="1000" height="600" >*/}
                    {/*    <DownloadDocument cartItems={this.context.cartItems} />*/}
                    {/*</PDFViewer>*/}
                </div>
            </Container>
        );
    }
}

Checkout.contextType = GlobalContext
export default Checkout;