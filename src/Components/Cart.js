import React, {Component} from 'react';
import GlobalContext from "../GlobalContext";
import {NavbarText} from "reactstrap";

class Cart extends Component {
    render() {
        return (
            <div style={{marginTop: '0px'}}>
                <span>Cart1</span>
                {this.context.shoppingCard}
                <i className="material-icons">local_grocery_store</i>
                <label id="lblCartCount" runat="server" CssClass="badge badge-warning"
                       ForeColor="White"/>
            </div>
        );
    }
}
Cart.contextType = GlobalContext
export default Cart;