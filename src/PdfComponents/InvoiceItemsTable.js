import React, {Component} from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'
import GlobalContext from "../GlobalContext";
import Checkout from "../Pages/Checkout";

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

class InvoiceItemsTable extends Component{

    componentDidMount() {
        console.log(this.props.invoice,'from table comp')
    }

    render(){
        return (
        <View style={styles.tableContainer}>
            <InvoiceTableHeader/>
            <InvoiceTableRow items={this.props.invoice}/>
            {/*<InvoiceTableBlankSpace rowsCount={ tableRowsCount - this.props.invoice.length} />*/}
            <InvoiceTableFooter items={this.props.invoice} />
        </View>
        )
    }

}

export default InvoiceItemsTable