import React, {Component} from 'react';
import ReactStars from "react-rating-stars-component";
import {Button, Card} from "reactstrap";
import '../Pages/css/Comment.css'
import axios from "axios";
class Comments extends Component {
    changeStatus =(newStatus)=>{
        axios.post(`https://localhost:5001/api/comments/update/${this.props.commentId}/status/${newStatus}`)
            .then((res)=>{
            window.location.reload()
        }).catch((error)=>{
            console.log(error)
            alert("error happened while changing the status")
        })
    }

    render() {
        if (this.props.userType == "Product Manager" ||this.props.userType == "Sales Manager" ) {
            if (this.props.approved == 1) {
                return (
                    <Card>
                        <div className="comment-widgets">
                            <div className="d-flex flex-row comment-row m-t-0">
                                <div className="p-2">
                                </div>
                                <div className="comment-text w-100">
                                    <h4>{this.props.username}</h4>

                                    <ReactStars
                                        count={5}
                                        fullIcon={<i className="material-icons">star</i>}
                                        emptyIcon={<i className="material-icons">star_border</i>}
                                        size={25}
                                        value={this.props.rate}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <span className="m-b-15 d-block">{this.props.text}</span>
                                    <div className="btnDiv">
                                        <Button color={"success"} className={"btn-success"}
                                                onClick={() => this.changeStatus(2)}>Approve</Button>
                                        <Button color={"danger"} className={"btn-danger"}
                                                onClick={() => this.changeStatus(0)}> Decline</Button>
                                    </div>
                                    <div className="comment-footer">
                                        <span className="text-muted float-right">{this.props.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            } else {
                if (this.props.approved == 0) {
                    return (
                        <Card>
                            <div className="comment-widgets">
                                <div className="d-flex flex-row comment-row m-t-0">
                                    <div className="p-2">
                                    </div>
                                    <div className="comment-text w-100">
                                        <h4>{this.props.username}</h4>
                                        <ReactStars
                                            count={5}
                                            fullIcon={<i className="material-icons">star</i>}
                                            emptyIcon={<i className="material-icons">star_border</i>}
                                            size={25}
                                            value={this.props.rate}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <span className="m-b-15 d-block">{this.props.text}</span>
                                        <div className="btnDiv">
                                            <p className={"status text-danger"}>Declined</p>
                                        </div>
                                        <div className="comment-footer">
                                            <span className="text-muted float-right">{this.props.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                }
                if (this.props.approved == 2) {
                    return (
                        <Card>
                            <div className="comment-widgets">
                                <div className="d-flex flex-row comment-row m-t-0">
                                    <div className="p-2">
                                    </div>
                                    <div className="comment-text w-100">
                                        <h4>{this.props.username}</h4>

                                        <ReactStars
                                            count={5}
                                            fullIcon={<i className="material-icons">star</i>}
                                            emptyIcon={<i className="material-icons">star_border</i>}
                                            size={25}
                                            value={this.props.rate}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <span className="m-b-15 d-block">{this.props.text}</span>
                                        <div className="btnDiv">
                                            <p className={"status text-success"}>Approved</p>
                                        </div>
                                        <div className="comment-footer">
                                            <span className="text-muted float-right">{this.props.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                }
            }
        }else{
            // for customer loading
            if (this.props.approved == 0) {
                return (
                    <Card>
                        <div className="comment-widgets">
                            <div className="d-flex flex-row comment-row m-t-0">
                                <div className="p-2">
                                </div>
                                <div className="comment-text w-100">
                                    <h4>{this.props.username}</h4>
                                    <span className="m-b-15 d-block">the product manager has declined your comment</span>
                                    <div className="btnDiv">
                                        <p className={"status text-danger"}>Declined</p>
                                    </div>
                                    <div className="comment-footer">
                                        <span className="text-muted float-right">{this.props.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            }
                if (this.props.approved == 1){
                    return(
                        <Card>
                            <div className="comment-widgets">
                                <div className="d-flex flex-row comment-row m-t-0">
                                    <div className="p-2">
                                    </div>
                                    <div className="comment-text w-100">
                                        <h4>{this.props.username}</h4>
                                        <span className="m-b-15 d-block">Your comment has not been approved</span>
                                        <div className="btnDiv">
                                            <p className={"status text-info"}>pending</p>
                                        </div>
                                        <div className="comment-footer">
                                            <span className="text-muted float-right">{this.props.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )
                }
                if (this.props.approved == 2) {
                    return (
                        <Card>
                            <div className="comment-widgets">
                                <div className="d-flex flex-row comment-row m-t-0">
                                    <div className="p-2">
                                    </div>
                                    <div className="comment-text w-100">
                                        <h4>{this.props.username}</h4>

                                        <ReactStars
                                            count={5}
                                            fullIcon={<i className="material-icons">star</i>}
                                            emptyIcon={<i className="material-icons">star_border</i>}
                                            size={25}
                                            value={this.props.rate}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <span className="m-b-15 d-block">{this.props.text}</span>
                                        <div className="btnDiv">
                                            <p className={"status text-success"}>Approved</p>
                                        </div>
                                        <div className="comment-footer">
                                            <span className="text-muted float-right">{this.props.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                }
            }
        }

}
export default Comments;