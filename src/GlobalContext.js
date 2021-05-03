import React, { Component, createContext } from 'react'
import axios from "axios";

const GlobalContext = createContext();
export class GlobalProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shoppingCard : -1,
            cartItems : [],
            IsLoggedIn : false,
            username : "",
            user_id : 0,
            email : ""
        }
        this.addItemCart = this.addItemCart.bind(this)
    }


    setCartItems(){

            axios.get(`https://localhost:5001/api/carts/getByUser/${parseInt(sessionStorage.getItem('user_id'))}`)
                .then((res) => {
                    res.data.map((val,index)=>{
                        var productId = val.product
                        this.fetchProducts(productId).then((data)=>{
                            this.addItemCart(data)
                        })
                    })
                    this.changeShoppingCard(res.data.length)
                    // resolve(res.data);
                }).catch((error) => {
                console.log(error)
                alert(" error happened fetch cart items number")
                this.changeShoppingCard(-1)
            })

    }

    async fetchProducts(productId){
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:5001/api/products/${productId}`)
                .then((product) => {
                    resolve(product.data)
                }).catch((error) => {
                console.log(error)
                alert("error happened fetch cart items")
            })
        })

    }
    addItemCart(product){
        if(this.state.cartItems.some(item => item.productName === product.productName)){

        } else{
            this.setState({cartItems : [...this.state.cartItems,product]})
        }
        // this.setState({cartItems : [...this.state.cartItems,product]})
    }

    changeShoppingCard = (cartLength) => {
        this.setState({shoppingCard :cartLength })
    }
    updateUsername = (username1) => {
        this.setState({username : username1})
    }
    updateUserID = (id) => {
        this.setState({user_id : id})
    }
    updateEmail = (email1) => {
        this.setState({email : email1})
    }
    updateIsLoggedIn = (IsLoggedIn) => {
        this.setState({IsLoggedIn : IsLoggedIn})
    }

    componentDidUpdate(prevProps, prevState) {




    }
    render() {
        const {shoppingCard,username,IsLoggedIn,user_id,cartItems} = this.state;
        const {changeShoppingCard,
            updateUsername,
            updateUserID,
            updateEmail,
            updateIsLoggedIn,
            setCartItems,
            fetchProducts,
            addItemCart
        } = this;
        return (
            <GlobalContext.Provider value={{
                shoppingCard,
                username,
                IsLoggedIn,
                user_id,
                cartItems,
                updateUsername,
                updateUserID,
                updateEmail,
                updateIsLoggedIn,
                changeShoppingCard,
                setCartItems,
                fetchProducts,
                addItemCart
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}
export default GlobalContext