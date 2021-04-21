import React, {Component} from 'react';
import {Card, CardBody, Col} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Dropzone from 'react-dropzone';
import '../Pages/css/uploadFile.css'
import axios from "axios";
class AddProduct extends Component {
    state = {
        productName : "",
        Brand : "",
        price:"",
        category : "",
        Description : "",
        Quantity : ""

    }
    updateSate = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name] : e.target.value})
    }
    uploadProduct = (e) =>{
        e.preventDefault()
        axios.post('https://localhost:5001/api/products/add', {
            "productName": this.state.productName,
            "Price": this.state.price.toString(),
            "Description": this.state.Description,
            "Comments": "No Comments",
            "Category": this.givesType(this.state.category),
            "UserId": sessionStorage.getItem("user_id")
            // "UserId": "12"
        }).then(res =>{
            // console.log(res.data)
            alert("uploaded successfully !")
        }).catch((error)=>{
            alert("product name is taken")
            console.log(error)
        })
    }
    givesType(category){
        switch (category) {
            case "CPU":
                return "1";
            case "GPU":
                return "2";
            case "Motherboard":
                return "3";
            case "Apple":
                return "4";
            case "Monitor":
                return "5";
        }
    }
    onDrop = (files) => {
        files.map(file => {
                Object.assign(file,
                    {
                        preview: URL.createObjectURL(file),

                    }, {
                        selected: false
                    }
                )

            }
        )
    }
    render()  {
        return (
            <Card body style={{width:'111%'}}>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Product name</Label>
                            <Input type="text" name="productName"  placeholder="" onChange={this.updateSate}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Brand</Label>
                            <Input type="text" name="Brand"  placeholder="" onChange={this.updateSate}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">price</Label>
                            <Input type="number" name="price"  placeholder="" onChange={this.updateSate}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">category</Label>
                                <Input type="select" name="category" onChange={this.updateSate}>
                                    <option>CPU</option>
                                    <option>GPU</option>
                                    <option>Motherboard</option>
                                    <option>Apple</option>
                                    <option>Monitor</option>
                                </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Quantity</Label>
                            <Input type="number" name="Quantity"  placeholder="" onChange={this.updateSate}/>
                        </FormGroup>
                    </Form>
                    <FormGroup>
                        <Label for="exampleText">Description</Label>
                        <Input type="textarea" name="Description" id="exampleText" onChange={this.updateSate}/>
                    </FormGroup>
                    <Dropzone onDrop={this.onDrop} multiple={false}>
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
                    <Button id={'btn'} size={'lg'} style={{float:'right',marginTop : "40px",width : '100%'}}
                    onClick={this.uploadProduct}>Add product</Button>
                </CardBody>
            </Card>
        );
    }
}

export default AddProduct;