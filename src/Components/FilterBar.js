import React, {Component} from 'react';
import {Card, CardBody, FormGroup, Input, Label} from "reactstrap";
import '../Pages/css/FilterBar.css'
class FilterBar extends Component {
    render() {
        return (
            <React.Fragment>
                <Card className="slide-bar">
                    <h5 id="filter-heading">Filters</h5>
                    <CardBody>
                            <h6 className="filter-heading d-none d-lg-block">Brands</h6>
                            <FormGroup>
                                <Input type="text" placeholder="search"/>
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
                            From <Input type="range"/>
                            To <Input type="range" />
                        </FormGroup>
                        <hr/>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default FilterBar;