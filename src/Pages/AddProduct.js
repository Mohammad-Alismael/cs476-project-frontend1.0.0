import React, {Component} from 'react';
import {Card, CardBody} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Dropzone from 'react-dropzone';
import '../Pages/css/uploadFile.css'
class AddProduct extends Component {
    render() {
        return (
            <Card body style={{width:'111%'}}>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Product name</Label>
                            <Input type="text" name="productName"  placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Brand</Label>
                            <Input type="text" name="productName"  placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">price</Label>
                            <Input type="number" name="productName"  placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Quantity</Label>
                            <Input type="number" name="productName"  placeholder="" />
                        </FormGroup>
                    </Form>
                    <Dropzone onDrop={this.context.onDrop} multiple={false}>
                        {({getRootProps, getInputProps}) => (
                            <section className="container">
                                <div {...getRootProps({className: 'dropzone'})} className="drag-drop">
                                    <input {...getInputProps()} />
                                    <i class="material-icons upload-icon">cloud_upload</i>
                                    <p>Drag & drop some files here, or click to select files</p>
                                </div>

                            </section>
                        )}
                    </Dropzone>
                    <Button id={'btn'} size={'lg'} style={{float:'right',marginTop : "40px",width : '100%'}}>Add product</Button>
                </CardBody>
            </Card>
        );
    }
}

export default AddProduct;