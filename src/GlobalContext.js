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
            priceBeforeDisc : 0,
            priceAfterDisc: 0,
            username : "",
            user_id : 0,
            email : "",
            totalSum: -1,
            discountCoupon : "",
            percentageDiscount: 0,
            usedCoupon : false,
            CouponExists: false,
            isEmpty1: false
        }
        this.addItemCart = this.addItemCart.bind(this)
    }


    setCartItems =() =>{

            axios.get(`https://localhost:5001/api/carts/getByUser/${parseInt(sessionStorage.getItem('user_id'))}`)
                .then((res) => {
                    console.log("checking update", res.data)
                    res.data.map((val, index) => {
                        const productId = val.product;
                        this.fetchProducts(productId).then((data) => {
                            this.addItemCart(data, val.quantity)
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
        var priceBeforeDisc = 0;
        this.sleep(500).then(()=>{
            this.state.cartItems.map((val,index)=>{
                priceBeforeDisc+= val.price * val.chosenQuantity
            });
            this.setState({priceBeforeDisc})
        })

    }
    calculatePriceProductAfterDisc(productId,percentageDiscount){
        var priceAfterDisc = 0;
         this.state.cartItems.map((val,index)=>{
             if (val.id == productId){
                 priceAfterDisc+= (val.price * val.chosenQuantity) * ((100 - percentageDiscount)/100)
             }else {
                 priceAfterDisc+= (val.price * val.chosenQuantity)
             }

         })
        this.setState({priceAfterDisc})
    }
    calculateTotalPriceGlobal =()=>{
       this.getItemsLocal().then((data)=>{
           console.log(data,'')
           })

    }

    checkingCouponExists(){
        const self = this;
        return new Promise((resolve, reject) => {
            axios.get('https://localhost:5001/api/campaign')
                .then((res) => {
                    var tmp = {}
                    tmp.productId = 0;
                    tmp.startingDate = 0;
                    tmp.endingDate = 0;
                    tmp.truth = false
                    tmp.percentageDiscount = 0

                    res.data.map((val, index) => {

                        if (val.description == self.state.discountCoupon) {
                            tmp.truth = true
                            tmp.productId= val.productId;
                            tmp.startingDate = val.startDate;
                            tmp.endingDate = val.endDate;
                            tmp.percentageDiscount = val.percentage
                           // resolve(tmp)
                        }
                    })
                    resolve(tmp)
                }).catch((error) => {
                console.log(error)
                toast.error("error happened while getting coupon percentage")
            })
        })
    }
    getCouponDiscount =() =>{
         const self = this;
         this.checkingCouponExists().then((data)=>{
             if (data.truth){
                 const currentTime = Math.floor(new Date().getTime()/1000)
                 if (data.startingDate <= currentTime && currentTime <= data.endingDate){
                    if (this.state.cartItems.some(item => item.id === data.productId)){
                        this.calculatePriceProductAfterDisc(data.productId,data.percentageDiscount)
                        this.setState({percentageDiscount: data.percentageDiscount})
                        toast.info("your coupon applied successfully ")
                    }else {
                        toast.info("the coupon doesn't apply on any of your cart products")
                    }
                 }else {
                     toast.info("expired coupon")
                 }
             }else {
                 toast.info("coupon doesn't exist")
             }
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
    setDiscountCoupon =(e)=>{
         e.preventDefault()
        this.setState({discountCoupon : e.target.value})
    }

    emptyCartItems = ()=>{
         this.state.cartItems.map((val,index)=>{
             this.emptyCartPerProduct(val.id)
         })
    }

    emptyCartPerProduct = (productId) =>{
         axios.post('https://localhost:5001/api/carts/delete',{
                 "userId": parseInt(sessionStorage.getItem('user_id')),
                 "product": productId
             }).catch((error) => {
             console.log(error)
             toast.error("error happened while deleting products from carts")
         })
    }
    render() {
        const {shoppingCard,
            username,
            IsLoggedIn,
            user_id,
            cartItems,
            priceBeforeDisc,
            priceAfterDisc,
            discountCoupon,
            percentageDiscount,
            isEmpty} = this.state;
        const {changeShoppingCard,
            updateUsername,
            updateUserID,
            updateEmail,
            updateIsLoggedIn,
            setDiscountCoupon,
            setCartItems,
            fetchProducts,
            addItemCart,
            calculateTotalPrice,
            calculateTotalPriceGlobal,
            getCouponDiscount,
            emptyCartItems,
            changeEmptyStatus
        } = this;
        return (
            <GlobalContext.Provider value={{
                shoppingCard,
                username,
                IsLoggedIn,
                user_id,
                priceBeforeDisc,
                priceAfterDisc,
                cartItems,
                discountCoupon,
                percentageDiscount,
                isEmpty,
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
                setDiscountCoupon,
                getCouponDiscount,
                emptyCartItems,
                changeEmptyStatus
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}
export default GlobalContext