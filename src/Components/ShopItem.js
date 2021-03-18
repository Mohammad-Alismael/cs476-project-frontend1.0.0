import React, {Component} from 'react';
import {Card, CardBody, CardImg,Button,CardSubtitle,
    CardTitle} from "reactstrap";
import tmpImg from '../Images/4.png';
import '../Pages/css/LandingPage.css'
class ShopItem extends Component {
    render() {
        return (
            <Card sm="6" className={"shopItem"}>
                <CardImg top width="100%" src={tmpImg} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">Apple watch</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">999$</CardSubtitle>
                    <Button color={"primary"} style={{width : "100%"}}>Add to cart</Button>
                </CardBody>
            </Card>
        );
    }
}

export default ShopItem;