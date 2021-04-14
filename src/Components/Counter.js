import React, {Component} from 'react';

class Counter extends Component {
    render() {
        return (
            <div className='main'>
                <button className='down_count' title='Down'>-</button>
                <input className='counter' type="text" placeholder="value..." value={this.props.value}/>
                <button className='up_count' title='Up'>+</button>
            </div>
        );
    }
}

export default Counter;