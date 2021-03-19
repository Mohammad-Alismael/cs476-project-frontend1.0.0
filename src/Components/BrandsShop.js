import React, {Component} from 'react';
import {Card, CardImg, CardTitle} from "reactstrap";
import tmp from '../Images/4.png'
class BrandsShop extends Component {
    render() {
        return (
            <Card>
                <CardImg src={this.props.srcImg}/>
                <CardTitle style={{textAlign : 'center'}}>{this.props.brandName}</CardTitle>
            </Card>
        );
    }
}

export default BrandsShop;