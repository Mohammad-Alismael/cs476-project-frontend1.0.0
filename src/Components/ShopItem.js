import React, {Component} from 'react';
import {Card, CardBody, CardImg,Button,CardSubtitle,
    CardTitle} from "reactstrap";
import tmpImg from '../Images/4.png';
import '../Pages/css/LandingPage.css'
import {withRouter} from 'react-router-dom';
class ShopItem extends Component {
    nextPath(path) {
        this.props.history.push(path);
    }
    render() {
        return (
            <Card sm="6" className={"shopItem"} onClick={() => this.nextPath(`item-details/:${this.props.item_id}`)}>
                <CardImg top width="100%" src={this.props.srcImg} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">{this.props.productName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.price}$</CardSubtitle>
                    <Button color={"primary"} style={{width : "100%"}}>Add to cart</Button>
                </CardBody>
            </Card>
        );
    }
}

export default withRouter(ShopItem);