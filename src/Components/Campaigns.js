import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardTitle, FormGroup, Label, Input, Button, CardHeader} from "reactstrap";

class Campaigns extends Component {
    render() {
        return (
            <Card style={{height: '450px'}}>
                <CardHeader>Adding Campaigns</CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label for="exampleEmail">campaign code</Label>
                        <Input type="email" name="campaignCode" placeholder="abc123.." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Starting date</Label>
                        <Input type="date" name="startingDate" placeholder="" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">ending date</Label>
                        <Input type="date" name="endingDate" placeholder="" />
                    </FormGroup>
                </CardBody>
                <Button id={'btn'}>Add campaign</Button>
            </Card>
        );
    }
}

Campaigns.propTypes = {};

export default Campaigns;