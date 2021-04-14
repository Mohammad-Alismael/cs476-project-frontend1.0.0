import React, {Component} from 'react';
import GlobalContext from "../GlobalContext";
import ItemDetails from "./ItemDetails";

class ShoppingCart extends Component {
    render() {
        return (
            <div>
                this is shopping cart page{this.context.shoppingCard}
            </div>
        );
    }
}
ShoppingCart.contextType = GlobalContext
export default ShoppingCart;