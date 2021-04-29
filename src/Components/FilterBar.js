import React, {Component} from 'react';
import {Button, Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import '../Pages/css/FilterBar.css'
class FilterBar extends Component {
    state = {
        searchTerm:"",
        min: 0,
        max:0,
        maxValueForAllProducts : 0,
        filteredProducts : [],
        stars:[]
    }
    componentDidMount() {
        var tmpArray = []
        var stars = [];
        setTimeout(()=>{
            this.props.products.map((val,index)=>{
                tmpArray[index] = val[0].price
                if (val[0].rate == 1){
                    stars[0]+=1;
                }else if(val[0].rate == 2){
                    stars[1]+=1;
                }else if(val[0].rate == 3){
                    stars[2]+=1;
                }else if(val[0].rate == 4){
                    stars[3]+=1;
                }else if(val[0].rate == 5){
                    stars[4]+=1;
                }
            })
        },200)

        this.setState({maxValueForAllProducts : Math.max.apply(null, tmpArray)},function () {
            console.log(this.state.maxValueForAllProducts,"aa")
        })
        console.log(stars)
        this.setState({stars})
    }

    update = ()=>{
        // i write the algorithm here
        // console.log(this.state.searchTerm)
        this.filterTerm(this.state.searchTerm).then((data)=>{
            console.log("After filtering name", data)
            this.setState({filteredProducts: data})
            this.filterPrice().then((data)=>{
                console.log("After filtering price", data)
                this.props.updateMethod(data)
            })

        })



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

            resolve(tmp)
        })
        return promise


    }

    filterPrice(){
        const promise = new Promise((resolve, reject) => {
            const copyOfOldProducts = [...this.state.filteredProducts]
            const filteredProducts = copyOfOldProducts.filter((val) => {
                if (val[0].price <= this.state.max && val[0].price >= this.state.min) {
                    return val
                }
            })
            this.setState({filteredProducts})
            console.log("max",this.state.max)
            console.log("min",this.state.min)
            resolve(filteredProducts)
        })
        // console.log(filteredProducts,"after filtering price")
        return promise;

    }
    render() {
        // console.log(this.state.filteredProducts,"from this")
        // console.log("max price for all products",this.state.maxValueForAllProducts)
        return (
            <React.Fragment>
                <Card className="slide-bar">
                    <h5 id="filter-heading">Filters</h5>
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
                                    From <Input type="number" min={0} onChange={(event)=>{
                                            this.setState({min: event.target.value})}}
                                            />
                                </Col>
                                <Col xl={4}>
                                    To <Input type="number" min={0} max={this.state.maxValueForAllProducts} onChange={(event)=>{
                                    this.setState({max: event.target.value})}}
                                />
                                </Col>
                                <Col xl={4}>
                                    <Button id={'Go-btn'} onClick={this.update}>GO</Button>
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
                                <span className={'HowMany'}>({this.state.stars[3]})</span>
                            </Row>
                            <Row onClick={()=>(alert("3 stars"))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span className={'HowMany'}>({this.state.stars[2]})</span>
                            </Row>
                            <Row onClick={()=>(alert("2 stars"))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span className={'HowMany'}>({this.state.stars[1]})</span>
                            </Row>
                            <Row onClick={()=>(alert("1 stars"))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span className={'HowMany'}>({this.state.stars[0]})</span>
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