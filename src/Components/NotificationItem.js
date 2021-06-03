import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends Component {
    d = new Date(this.props.endTime*1000);
    render() {
        if (this.props.seen != 1){
            return (
                <div className={'notificationItem'}>
                    <img src={'https://static.thenounproject.com/png/170070-200.png'}/>
                    <p>{this.props.title}</p>
                    {/*<p>{this.d.getDate() + '/' + (this.d.getMonth()+1) + '/' + this.d.getFullYear()}</p>*/}
                    <p id={'desc'}>New Coupon on <b>{this.props.productName}</b></p>
                    <p id={'prdnm'}>Coupon Code <b>{this.props.description}</b></p>
                </div>
            );
        }else {
            return null
        }

    }
}

NotificationItem.propTypes = {};

export default NotificationItem;