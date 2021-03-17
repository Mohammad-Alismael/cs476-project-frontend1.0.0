import React, { Component, createContext } from 'react'

const GlobalContext = createContext();
export class GlobalProvider extends Component {
    state = {
        shoppingCard : 0
    }

    changeShoppingCard = () => {
        var {shoppingCard} = this.state
        this.setState({shoppingCard : shoppingCard + 1})
    }





    render() {
        const {shoppingCard} = this.state;
        const {changeShoppingCard} = this;
        return (
            <GlobalContext.Provider value={{
                shoppingCard,
                changeShoppingCard
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}
export default GlobalContext