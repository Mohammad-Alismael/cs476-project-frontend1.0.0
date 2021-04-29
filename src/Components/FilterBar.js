import React, {Component} from 'react';
import {Button, Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import '../Pages/css/FilterBar.css'
class FilterBar extends Component {
    state = {
        searchTerm:"",
        filteredProducts : []
    }
    componentDidMount() {
        // this.setState({filteredProducts: this.props.products})
    }

    update = ()=>{
        // i write the algorithm here
        console.log(this.state.searchTerm)
        this.filterTerm(this.state.searchTerm).then((data)=>{
            this.props.updateMethod(data)
        })
        console.log("old list",this.props.products)


        // this.setState({filteredProducts: tmp},function () {
        //     console.log("new list",this.state.filteredProducts)
        // })
    }
    filterTerm(term){
        const promise = new Promise((resolve, reject) => {
            const copyOfOldProducts = [...this.props.products]
            const tmp = copyOfOldProducts.filter((val) => {
                if (term == "") {
                    return val
                } else if (val[0].name.toLowerCase().includes(term.toLowerCase())) {
                    return val
                }
            })
            this.setState({filteredProducts: tmp})
            resolve(tmp)
        })
        return promise


    }
    render() {
        return (
            <React.Fragment>
                <Card className="slide-bar">
                    <h5 id="filter-heading">Filters</h5>
                    <button onClick={this.update}>tmp</button>
                    <CardBody>
                            <h6 className="filter-heading d-none d-lg-block">Brands</h6>
                            <FormGroup>
                                <Input type="text" placeholder="search" onChange={(event)=>{
                                    this.setState({searchTerm: event.target.value})
                                }}/>
                            </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio1" />{' '}
                                        Intel
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio1" />{' '}
                                        AMD
                                    </Label>
                                </FormGroup>
                        <hr/>
                        <h6 className="filter-heading d-none d-lg-block">Price</h6>
                        <FormGroup>
                            <Row>
                                <Col xl={4}>
                                    From <Input type="number" min={0}/>
                                </Col>
                                <Col xl={4}>
                                    To <Input type="number" />
                                </Col>
                                <Col xl={4}>
                                    <Button id={'Go-btn'}>GO</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                        <hr/>
                        <FormGroup>
                            <Label>Sort By</Label>
                            <Input type="select">
                                <option>Recommend</option>
                                <option>Low to High</option>
                                <option>High to Low</option>
                            </Input>
                        </FormGroup>
                        <hr/>
                        <FormGroup>
                            <Label>Display</Label>
                            <Input type="select">
                                <option>50 per page</option>
                                <option>100 per page</option>
                                <option>150per page</option>
                            </Input>
                        </FormGroup>
                        <hr/>
                        <h6 className="filter-heading d-none d-lg-block">Ratings</h6>
                        <Col>
                            <Row onClick={()=>(alert("4 stars"))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span>& up</span>
                                <span className={'HowMany'}>(43)</span>
                            </Row>
                            <Row onClick={()=>(alert("3 stars"))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span>& up</span>
                                <span className={'HowMany'}>(43)</span>
                            </Row>
                            <Row onClick={()=>(alert("2 stars"))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span>& up</span>
                                <span className={'HowMany'}>(43)</span>
                            </Row>
                            <Row onClick={()=>(alert("1 stars"))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span>& up</span>
                                <span className={'HowMany'}>(43)</span>
                            </Row>
                        </Col>
                        <hr/>
                        <Button id={'filter-btn'} onClick={this.update}>CLEAR ALL FILTERS</Button>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default FilterBar;