import React, { Component, createContext } from 'react'

const GlobalContext = createContext();
export class GlobalProvider extends Component {
    state = {
        shoppingCard : parseInt(localStorage.getItem("howManyItems")),
        IsLoggedIn : false,
        username : "",
        user_id : 0,
        email : ""
    }

    changeShoppingCard = () => {
        var {shoppingCard} = this.state
        this.setState({shoppingCard : shoppingCard + 1})
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
        if (this.state.shoppingCard !== prevState.shoppingCard) {
            // Whatever storage mechanism you end up deciding to use.
            localStorage.setItem("howManyItems", this.state.shoppingCard)
        }
    }
    render() {
        const {shoppingCard,username,IsLoggedIn,user_id} = this.state;
        const {changeShoppingCard,
            updateUsername,
            updateUserID,
            updateEmail,
            updateIsLoggedIn} = this;
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
                changeShoppingCard
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}
export default GlobalContext