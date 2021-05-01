import React, {Component} from 'react';
import {Button, Card, CardBody, Col, FormGroup, Input, Label, Row,Spinner} from "reactstrap";
import '../Pages/css/FilterBar.css'
class FilterBar extends Component {
    state = {
        searchTerm:"",
        min: 0,
        max:0,
        maxValueForAllProducts : 0,
        sortBy: "",
        filteredProducts : [],
        stars:[0,0,0,0,0],
        loading: 'initial',
        selectedRatings : -1
    }
    setup(){
        const promise = new Promise((resolve, reject) => {
            setTimeout(()=>{
                const tmp = {};
                tmp.tmpArray =[];
                tmp.stars = [];
                const stars2 = [0,0,0,0,0];
                this.props.products.map((val,index)=>{
                    tmp.tmpArray[index] = val[0].price
                    for (let i=0; i <5; i++){
                        if (parseInt(val[0].rate) >= i+1){
                            stars2[i] += 1;
                        }
                    }
                })
                tmp.stars = stars2
                resolve(tmp)
            },500)
        })

        return promise
    }
    componentDidMount() {
        this.setState({ loading: 'true' });
        this.setup().then((data)=>{
            console.log(data)
            this.setState({maxValueForAllProducts : Math.max.apply(null, data.tmpArray)},function () {
                console.log(this.state.maxValueForAllProducts,"aa")
            })
            this.setState({stars: data.stars})
        })

        this.setState({
            loading: 'false'
        });

        this.changeStateLister()
    }

    update = ()=>{
        // i write the algorithm here
        this.filterTerm(this.state.searchTerm).then((data)=>{
            console.log("After filtering name", data)
            this.setState({filteredProducts: data})
            //this.props.updateMethod(data)
            this.filterPrice(this.state.filteredProducts).then((data)=>{
                console.log("After filtering price", data)
                this.setState({filteredProducts: data})
                this.sort(this.state.filteredProducts).then((data)=>{
                    console.log("After sorting", data)
                    this.setState({filteredProducts: data})
                    this.filterUsingRating(this.state.filteredProducts).then((data)=>{
                        console.log("After selecting rate", data)
                        this.props.updateMethod(data)
                    })


                })
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

    filterPrice(data){
        const promise = new Promise((resolve, reject) => {
            const copyOfOldProducts = [...this.state.filteredProducts]
            const filteredProducts = data.filter((val) => {
                if (val[0].price <= this.state.max && val[0].price >= this.state.min) {
                    return val
                }
            })
            this.setState({filteredProducts})
            console.log("max",this.state.max)
            console.log("min",this.state.min)
            resolve(filteredProducts)
        })
        return promise;

    }
    sort(data){
        const promise = new Promise((resolve, reject) => {
            // this.setState({sortBy: "High to Low"})
            var filteredProducts = []
            const copyOfOldProducts = [...this.state.filteredProducts]
            if(this.state.sortBy == "Low to High"){
                console.log("loh")
                filteredProducts = data.sort((a,b)=>{
                    if (a[0].price > b[0].price) return 1;
                    else if (b[0].price > a[0].price) return -1;
                    else return 0;
                })
            }else if (this.state.sortBy == "High to Low"){
                console.log("hol")
                filteredProducts = data.sort((a,b)=>{
                    return b[0].price - a[0].price
                })
            }else{
                filteredProducts = data
            }

            console.log("selected",this.state.sortBy)
            resolve(filteredProducts)
        })
        return promise;
    }

    filterUsingRating(data){
        const promise = new Promise((resolve, reject) => {
            if (this.state.selectedRatings != -1){
                const tmp = data.filter((val) => {
                    if (parseInt(val[0].rate) >= this.state.selectedRatings) {
                        return val
                    }
            })
                resolve(tmp)
            }else {
                resolve(data)
            }
        })
        return promise
    }

    changeStateLister = () =>{
        this.setState({sortBy : "Recommend"})
        this.setState({selectedRatings : -1})
        this.setState({searchTerm : ""})
        this.props.updateMethod(this.props.products)
    }
    render() {
        if (this.state.loading === 'initial') {
            return (
                <div>
                    <Spinner color="danger" style={{ width: '30rem', height: '30rem' }}/>
                </div>
            );
        }


        if (this.state.loading === 'true') {
            return (
                <div>
                    <Spinner color="black" />
                </div>
            );
        }
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
                                    To <Input type="number" name="max" min={0} max={this.state.maxValueForAllProducts}
                                              // value={this.state.maxValueForAllProducts}
                                              onChange={(event)=>{
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
                                <span className={'HowMany'}>({this.state.stars[3]})</span>
                            </Row>
                            <Row onClick={()=>(this.setState({selectedRatings : 3}))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span className={'HowMany'}>({this.state.stars[2]})</span>
                            </Row>
                            <Row onClick={()=>(this.setState({selectedRatings : 2}))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span className={'HowMany'}>({this.state.stars[1]})</span>
                            </Row>
                            <Row onClick={()=>(this.setState({selectedRatings : 1}))}>
                                <i className="material-icons ratingStars">star</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <i className="material-icons ratingStars">star_border</i>
                                <span className={'HowMany'}>({this.state.stars[0]})</span>
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