import React, {Component} from 'react';
import GlobalContext from "../GlobalContext";

class LandingPage extends Component {
    render() {
        return (
            <div>
                this is landing page
                {this.context.shoppingCard}
            </div>
        );
    }
}
LandingPage.contextType = GlobalContext
export default LandingPage;