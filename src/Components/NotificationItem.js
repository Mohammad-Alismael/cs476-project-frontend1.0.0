import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends Component {
    render() {
        return (
            <div className={'notificationItem'}>
                <img src={'https://static.thenounproject.com/png/170070-200.png'}/>
                <p>{this.props.title}</p>
                <p>{this.props.time}</p>
                <p id={'desc'}>{this.props.description}</p>

            </div>
        );
    }
}

NotificationItem.propTypes = {};

export default NotificationItem;