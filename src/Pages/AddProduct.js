import React, {Component} from 'react';
import {Card, CardBody, Col, Container} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Dropzone from 'react-dropzone';
import '../Pages/css/uploadFile.css'
import axios from "axios";
import {toast} from "react-toastify";
class AddProduct extends Component {
    state = {
        productName : "",
        Brand : "",
        price:"",
        category : "",
        Description : "",
        Quantity : "",
        img:""

    }
    updateSate = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name] : e.target.value})
    }
    uploadProduct = (e) =>{
        e.preventDefault()
        if (this.state.img != "") {
            axios.post('https://localhost:5001/api/products/add', {
                "productName": this.state.productName,
                "Price": this.state.price.toString(),
                "Description": this.state.Description,
                "Comments": "No Comments",
                "Category": this.givesType(this.state.category),
                "UserId": sessionStorage.getItem("user_id"),
                "Quantity": this.state.Quantity,
                "brand": this.state.Brand,
                "picture": this.state.img
            }).then(res => {
                // console.log(res.data)
                toast.success("uploaded successfully !")
            }).catch((error) => {
                toast.info("product name is taken")
                console.log(error)
            })
        }else {
            toast.info('you have to add an image for a product')
        }
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

                    }
                )

            }
        )
        let base64String = "";
        let imageBase64Stringsep = "";
        const reader = new FileReader();
        const self = this;
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
            imageBase64Stringsep = base64String;
            self.setState({img : imageBase64Stringsep},function () {
                this.renderImg()
            })
        }
        var file = document.querySelector(
            'input[type=file]')['files'][0]
        reader.readAsDataURL(file);


    }
    renderImg(){
        console.log(this.state.img,"dd")
    }
    render()  {
        return (
            <Container style={{marginLeft: '11%'}}>
            <Card style={{margin: '20px'}}>
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
                                    <option>choose category</option>
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
            </Container>
        );
    }
}

export default AddProduct;