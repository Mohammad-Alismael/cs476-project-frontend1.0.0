import React, {Component} from 'react';
import {Card, CardImg, CardTitle} from "reactstrap";
import tmp from '../Images/4.png'
class BrandsShop extends Component {
    render() {
        return (
            <Card>
                <CardImg src={tmp}/>
                <CardTitle style={{textAlign : 'center'}}>Apple</CardTitle>
            </Card>
        );
    }
}

export default BrandsShop;