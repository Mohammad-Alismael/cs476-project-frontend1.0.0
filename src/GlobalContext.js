import React, { Component, createContext } from 'react'
import axios from "axios";
import {toast} from "react-toastify";

const GlobalContext = createContext();
export class GlobalProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shoppingCard : -1,
            cartItems : [],
            IsLoggedIn : false,
            priceBeforeDisc : -1,
            username : "",
            user_id : 0,
            email : "",
            totalSum: -1
        }
        this.addItemCart = this.addItemCart.bind(this)
    }


    setCartItems(){
            axios.get(`https://localhost:5001/api/carts/getByUser/${parseInt(sessionStorage.getItem('user_id'))}`)
                .then((res) => {
                    res.data.map((val,index)=>{
                        const productId = val.product;
                        this.fetchProducts(productId).then((data)=>{
                            this.addItemCart(data,val.quantity)
                        })
                    })
                    this.changeShoppingCard(res.data.length)

                }).catch((error) => {
                console.log(error)
                alert(" error happened fetch cart items number")
                this.changeShoppingCard(-1)
            })

        this.calculateTotalPrice()
    }
    async test(productId,quantity){
        this.fetchProducts(productId).then((productData)=>{
            // totalSum += (val.quantity * productData.price)
            return quantity * productData.price
            // TmpArray[index] = productData;
            // TmpArray[index].chosenQuantity = val.quantity
        })
        return -1
    }
    totalSum = 0;
     getItemsLocal(){
         const self = this;
          return  new Promise((resolve, reject) => {
              // var TmpArray = {};

              axios.get(`https://localhost:5001/api/carts/getByUser/${parseInt(sessionStorage.getItem('user_id'))}`)
                      .then((res) => {
                          let totalSum = 0;
                          this.totalSum = 0;
                          this.setState({totalSum : 110})
                          res.data.map((val, index) => {
                              const productId = val.product;
                              // TmpArray[index] = {}
                              // this.test(productId,val.quantity)
                              this.fetchProducts(productId).then((productData)=>{
                                  this.setState({totalSum : 1210})
                                  // totalSum += (val.quantity * productData.price)
                                  // self.setState({totalSum : (val.quantity * productData.price)})
                                  // this.totalSum += val.quantity * productData.price
                                  // TmpArray[index] = productData;
                                  // TmpArray[index].chosenQuantity = val.quantity
                              })
                          })
                          resolve(self.state.totalSum)
                      }).catch((error) => {
                      console.log(error)
                      alert(" error happened fetching cart items for price")
                  })

          })

    }
    async fetchProducts(productId){
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:5001/api/products/${productId}`)
                .then((product) => {
                    resolve(product.data)
                }).catch((error) => {
                console.log(error)
                toast.error("error happened fetch cart items")
            })
        })

    }
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    addItemCart(product,quantity){
        product.chosenQuantity = quantity;
        if(!this.state.cartItems.some(item => item.productName === product.productName)){
            this.setState({cartItems : [...this.state.cartItems,product]})
        }

    }
    calculateTotalPrice =()=>{
        var priceBeforeDisc = -22;
        this.sleep(500).then(()=>{
            this.state.cartItems.map((val,index)=>{
                priceBeforeDisc+= val.price * val.chosenQuantity
            });
            this.setState({priceBeforeDisc})
        })



    }

    calculateTotalPriceGlobal =()=>{
       this.getItemsLocal().then((data)=>{
           console.log(data,'aa7a')
           })

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

    render() {
        const {shoppingCard,username,IsLoggedIn,user_id,cartItems,priceBeforeDisc} = this.state;
        const {changeShoppingCard,
            updateUsername,
            updateUserID,
            updateEmail,
            updateIsLoggedIn,
            setCartItems,
            fetchProducts,
            addItemCart,
            calculateTotalPrice,
            calculateTotalPriceGlobal,
        } = this;
        return (
            <GlobalContext.Provider value={{
                shoppingCard,
                username,
                IsLoggedIn,
                user_id,
                priceBeforeDisc,
                cartItems,
                updateUsername,
                updateUserID,
                updateEmail,
                updateIsLoggedIn,
                changeShoppingCard,
                setCartItems,
                fetchProducts,
                addItemCart,
                calculateTotalPrice,
                calculateTotalPriceGlobal,
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}
export default GlobalContext