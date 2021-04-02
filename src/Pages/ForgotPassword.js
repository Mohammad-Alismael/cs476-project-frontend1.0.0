import React, {Component} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Input, Label, Row} from "reactstrap";

class ForgotPassword extends Component {
    render() {
        return (
            <Container fuild>
                <Row>
                    <Col className="col-md-4 col-xs-4 col-md-offset-3"/>
                    <Col className="col-md-5 col-xs-5 col-md-offset-3">
                        <Card body className="text-center">
                            <CardTitle tag="h3">Let us help you</CardTitle>
                            <CardBody>
                                <FormGroup>
                                    <Label>verification code</Label>
                                    <Input type="text" name="text" id="exampleEmail" placeholder="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>New password</Label>
                                    <Input type="text" name="text" id="NewPassword" placeholder="" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Verify password</Label>
                                    <Input type="text" name="text" id="NewPassword" placeholder="" />
                                </FormGroup>
                                <Button style={{width:'100%',background:'rgb(111, 107, 232)'}}>Change password</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        );
    }
}

export default ForgotPassword;