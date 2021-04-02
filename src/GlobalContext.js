import React, { Component, createContext } from 'react'

const GlobalContext = createContext();
export class GlobalProvider extends Component {
    state = {
        shoppingCard : 0,
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
    updateUseID = (id) => {
        this.setState({user_id : id})
    }
    updateEmail = (email1) => {
        this.setState({email : email1})
    }
    updateIsLoggedIn = (IsLoggedIn) => {
        this.setState({IsLoggedIn : IsLoggedIn})
    }
    render() {
        const {shoppingCard,username,IsLoggedIn} = this.state;
        const {changeShoppingCard,
            updateUsername,
            updateUseID,
            updateEmail,
            updateIsLoggedIn} = this;
        return (
            <GlobalContext.Provider value={{
                shoppingCard,
                username,
                IsLoggedIn,
                updateUsername,
                updateUseID,
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