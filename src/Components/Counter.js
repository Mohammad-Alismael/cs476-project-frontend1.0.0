import React, {Component} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import GlobalContext from "../GlobalContext";
import ItemDetails from "../Pages/ItemDetails";

class Counter extends Component {
    state = {
        Quantity : this.props.chosenQuantity
    }
    // asking the backend to give me an updated version of it
    minusQuantity = (e) =>{
        e.preventDefault()
        if ( this.state.Quantity > 1 )
            this.setState({Quantity: this.state.Quantity - 1},function () {
                axios.post(`https://localhost:5001/api/carts/update/${this.props.productId}/${parseInt(sessionStorage.getItem("user_id"))}/${this.state.Quantity}`)
                    .then((res)=>{
                    // to update something

                        this.context.setCartItems()
                        window.location.reload()
                }).catch((error) => {
                    console.log(error)
                    toast.error("error happened while changing the quantity minus")
                })
            })

    }

    addQuantity = (e) =>{
        e.preventDefault()
        if ( this.state.Quantity < this.props.maxQuantity )
            this.setState({Quantity: this.state.Quantity + 1},function () {
                axios.post(`https://localhost:5001/api/carts/update/${this.props.productId}/${parseInt(sessionStorage.getItem("user_id"))}/${this.state.Quantity}`)
                    .then((res)=>{
                        // to update something
                        this.context.setCartItems()
                        window.location.reload()
                    }).catch((error) => {
                    console.log(error)
                    toast.error("error happened while changing the quantity")
                })
            })
    }
    render() {
        return (
            <div className='main'>
                <button className='down_count' title='Down' onClick={this.minusQuantity}>-</button>
                <input className='counter' type="text" placeholder="value..." value={this.state.Quantity}/>
                <button className='up_count' title='Up' onClick={this.addQuantity}>+</button>
            </div>
        );
    }
}
Counter.contextType = GlobalContext
export default Counter;