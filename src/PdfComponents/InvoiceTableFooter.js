import React, {Component} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import GlobalContext from "../GlobalContext";
import Checkout from "../Pages/Checkout";

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
});


class InvoiceTableFooter extends Component{

    state = {
        total : 0
    }

    componentDidMount() {
        const total = this.props.items.map(item => item.qty * item.rate)
            .reduce((accumulator, currentValue) => accumulator + currentValue , 0)

        this.setState({total})
    }

    render(){
        return(
            <View style={styles.row}>
                <Text style={styles.description}>TOTAL</Text>
                <Text style={styles.total}>{(this.state.total).toFixed(2)}</Text>
            </View>
        )
    }

};

InvoiceTableFooter.contextType = GlobalContext;
export default InvoiceTableFooter