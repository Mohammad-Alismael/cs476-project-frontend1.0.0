import React, {Component} from 'react';
import {Card} from "reactstrap";

class ItemDetails extends Component {
    render() {
        return (
            <Card>
                this is item details page{this.props.match.params.item_id}
            </Card>
        );
    }
}

export default ItemDetails;