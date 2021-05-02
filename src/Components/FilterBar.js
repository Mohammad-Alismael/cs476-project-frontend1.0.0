import React, {Component} from 'react';
import {Button, Card, CardBody, Col, FormGroup, Input, Label, Row,Spinner} from "reactstrap";
import '../Pages/css/FilterBar.css'
class FilterBar extends Component {
    state = {
        searchTerm:"",
        min: 0,
        max:this.props.maxPrice,
        maxValueForAllProducts : 0,
        sortBy: "",
        filteredProducts : [],
        stars:[0,0,0,0,0],
        loading: 'initial',
        selectedRatings : -1
    }

    componentDidMount() {
        this.setState({stars: this.props.stars},function () {
            console.log(this.state.stars)
        })
        this.changeStateLister()
    }

    updateV2 = (e)=>{
        e.preventDefault()
        console.log("search term",this.state.searchTerm)
        // filter name
        const filteredArray = this.props.products.filter((val) => {
            if (this.state.searchTerm == "") {
                return val
            } else if (val[0].name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                return val
            }
            // filter price
        }).filter((val) => {
            if (val[0].price <= this.state.max && val[0].price >= this.state.min) {
                return val
            }
            // filter rate
        }).filter((val) => {
            if (parseInt(val[0].rate) >= this.state.selectedRatings) {
                return val
            }
        }).sort((a,b)=>{
            if(this.state.sortBy == "Low to High"){
                if (a[0].price > b[0].price) return 1;
                else if (b[0].price > a[0].price) return -1;
                else return 0;
            }else{
                return b[0].price - a[0].price
            }
        })
        console.log("after many filtering",filteredArray)
        this.props.updateMethod(filteredArray)
    }


    changeStateLister = () =>{
        this.setState({sortBy : "Recommend"})
        this.setState({selectedRatings : -1})
        this.setState({searchTerm : ""})
        this.props.updateMethod(this.props.products)
    }

    render() {

        return (
            <React.Fragment>
                <Card className="slide-bar">
                    <h5 id="filter-heading">Filters</h5>
                    <CardBody>
                            <h6 className="filter-heading d-none d-lg-block">Name</h6>
                            <FormGroup>
                                <Input type="text" placeholder="search" onChange={(event)=>{
                                    this.setState({searchTerm: event.target.value})
                                }}/>
                            </FormGroup>
                        <hr/>
                        <h6 className="filter-heading d-none d-lg-block">Price</h6>
                        <FormGroup>
                            <Row>
                                <Col xl={4}>
                                    From <Input type="number" min={0} onChange={(event)=>{
                                            this.setState({min: event.target.value})}}
                                            />
                                </Col>
                                <Col xl={4}>
                                    To <Input type="number" name="max" min={0} max={this.props.maxPrice}
                                              onChange={(event)=>{
                                            this.setState({max: event.target.value})}}
                                />
                                </Col>
                                <Col xl={4}>
                                    <Button id={'Go-btn'} onClick={this.updateV2}>GO</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                        <hr/>
                        <FormGroup>
                            <Label>Sort By</Label>
                            <Input type="select" name="sortBy" onChange={(event)=>{
                                this.setState({sortBy: event.target.value})}}>
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
                            <Row onClick={()=>(this.setState({selectedRatings : 4}))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span>& up</span>
                                <span className={'HowMany'}>({this.props.stars[3]})</span>
                            </Row>
                            <Row onClick={()=>(this.setState({selectedRatings : 3}))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span className={'HowMany'}>({this.props.stars[2]})</span>
                                <span>& up</span>
                            </Row>
                            <Row onClick={()=>(this.setState({selectedRatings : 2}))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span className={'HowMany'}>({this.props.stars[1]})</span>
                                <span>& up</span>
                            </Row>
                            <Row onClick={()=>(this.setState({selectedRatings : 1}))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span className={'HowMany'}>({this.props.stars[0]})</span>
                                <span>& up</span>
                            </Row>
                        </Col>
                        <hr/>
                        <Button id={'filter-btn'} onClick={this.changeStateLister}>CLEAR ALL FILTERS</Button>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default FilterBar;