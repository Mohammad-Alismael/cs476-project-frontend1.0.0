import React, { Component, createContext } from 'react'
import axios from "axios";

const GlobalContext = createContext();
export class GlobalProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingCard : -1,
            IsLoggedIn : false,
            username : "",
            user_id : 0,
            email : ""
        }
    }

    setCartItems(){
        const promise = new Promise((resolve, reject) => {
            axios.get(`https://localhost:5001/api/carts/getByUser/${12}`)
                .then((res) => {
                    console.log(res.data.length, "length")
                    resolve(res.data.length);
                }).catch((error) => {
                console.log(error)
                alert(" error happened fetch cart items")
                resolve(-11);
            })
        })
        return promise
    }


    changeShoppingCard = (cartLength) => {

        var {shoppingCard} = this.state
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

            // Whatever storage mechanism you end up deciding to use.
            // localStorage.setItem("howManyItems", this.state.shoppingCard)

            // this.setState({shoppingCard :x})


    }
    render() {
        const {shoppingCard,username,IsLoggedIn,user_id} = this.state;
        const {changeShoppingCard,
            updateUsername,
            updateUserID,
            updateEmail,
            updateIsLoggedIn,
            setCartItems
        } = this;
        return (
            <GlobalContext.Provider value={{
                shoppingCard,
                username,
                IsLoggedIn,
                user_id,
                updateUsername,
                updateUserID,
                updateEmail,
                updateIsLoggedIn,
                changeShoppingCard,
                setCartItems
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}
export default GlobalContext