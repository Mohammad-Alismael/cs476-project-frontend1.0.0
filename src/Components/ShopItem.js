import React, {Component} from 'react';
import {
    Card, CardBody, CardImg, Button, CardSubtitle, Row,
    CardTitle, Spinner
} from "reactstrap";
import tmpImg from '../Images/4.png';
import '../Pages/css/LandingPage.css'
import {withRouter} from 'react-router-dom';
class ShopItem extends Component {
    state = {
        loading: 'initial',
        stars : []
    }
    nextPath(path) {
        this.props.history.push(path);
    }
    loadData() {
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('This is my data.');
            }, 500);
        });

        return promise;
    }
    componentDidMount() {
        this.setState({ loading: 'true' });


        this.loadData()
            .then((data) => {
                for (var i=0; i < this.props.rate; i++){
                    console.log("@")
                    this.setState({stars : [...this.state.stars, <i className="material-icons ratingStars">star</i>]})
                }
                for (var j=0; j < 5 - this.props.rate; j++){
                    this.setState({stars : [...this.state.stars, <i className="material-icons ratingStars">star_border</i>]})
                }
                this.setState({
                    loading: 'false'
                });
            });
        console.log(this.state.stars)
    }

    render() {
        if (this.state.loading === 'initial') {
            return (
                <div>
                    <Spinner color="danger" />
                </div>
            );
        }



        if (this.state.loading === 'true') {
            return (
                <div>
                    <Spinner color='rgb(120,60,237)' />
                </div>
            );
        }
        return (
            <Card sm="6" className={"shopItem"} onClick={() => this.nextPath(`item-details/:${this.props.item_id}`)}>
                <CardImg top width="100%" src={this.props.srcImg} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">{this.props.productName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.price}$</CardSubtitle>
                    <Row onClick={()=>(alert("1 stars"))} className={'itemShopRating'}>
                        {this.state.stars}
                    </Row>
                    <Button style={{width : "100%"}} id={'btn'}>Add to cart</Button>
                </CardBody>
            </Card>
        );
    }
}

export default withRouter(ShopItem);