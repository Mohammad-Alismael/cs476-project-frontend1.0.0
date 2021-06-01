import React, {Component} from 'react';
import logo from '../Images/logo_cs476.png'
import {Document, Page, Text, View, StyleSheet, Image} from "@react-pdf/renderer";
import InvoiceTitle from "./PdfComponents/InvoiceTitle";
import InvoiceNo from "./PdfComponents/InvoiceNo";
import BillTo from "./PdfComponents/BillTo";
import InvoiceItemsTable from "./PdfComponents/InvoiceItemsTable";
import InvoiceThankYouMsg from "./PdfComponents/InvoiceThankYouMsg";
import GlobalContext from "../GlobalContext";
import {Spinner} from "reactstrap";

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});


class DownloadDocument extends Component {
    state = {
        invoice: {
            id: "5df3180a09ea16dc4b95f910",
            invoice_no: "201906-28",
            balance: "$2,283.74",
            company: "PHP programmers matter",
            email: "mohammad.alismael@ozu.edu.tr",
            phone: "+1 (000) 000-0000",
            address: "no address",
            trans_date: new Date().toISOString().slice(0, 10),
            items: [
                {
                    sno: 1,
                    desc: "ad sunt culpa occaecat qui",
                    qty: 5,
                    rate: 405.89,
                },
                {
                    sno: 2,
                    desc: "cillum quis sunt qui aute",
                    qty: 5,
                    rate: 373.11,
                },
                {
                    sno: 3,
                    desc: "ea commodo labore culpa irure",
                    qty: 5,
                    rate: 458.61,
                },
                {
                    sno: 4,
                    desc: "nisi consequat et adipisicing dolor",
                    qty: 10,
                    rate: 725.24,
                },
                {
                    sno: 5,
                    desc: "proident cillum anim elit esse",
                    qty: 4,
                    rate: 141.02,
                },
            ]
        },
        items: [],
        loading: 'initial'
    };


    componentDidMount() {
        this.setState({ loading: 'true' });
        let temp = this.props.cartItems.map((val,index) => {
            return {
                sno: index+1,
                desc: val.productName,
                qty: val.chosenQuantity,
                rate: val.price
            }
        })

        this.setState({items: temp},function () {
            console.log(this.state.items, 'copy items')
        })
        console.log(this.props.cartItems, 'checked from checkout');
        this.setState({
            loading: 'false'
        });
    }
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    render() {
        if (this.state.loading === 'initial') {
            return (
                <div>
                    <Spinner color="danger" style={{ width: '20rem', height: '20rem',marginLeft: '45%',marginTop: '10%',marginBottom: '10%' }}/>
                </div>
            );
        }
        if(this.state.loading === 'true') {
            return (
                <div>
                    <Spinner color="black" style={{
                        width: '20rem',
                        height: '20rem',
                        marginLeft: '45%',
                        marginTop: '10%',
                        marginBottom: '10%'
                    }}/>
                </div>
            );
        }
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Image style={styles.logo} src={logo} />
                    <InvoiceTitle title='Invoice'/>
                    <InvoiceNo invoice={this.state.invoice}/>
                    <BillTo invoice={this.state.invoice}/>
                    <InvoiceItemsTable invoice={this.state.items} nigga={'nigga'}/>
                    <InvoiceThankYouMsg />
                </Page>
            </Document>
        );
    }
}


DownloadDocument.contextType = GlobalContext
export default DownloadDocument;