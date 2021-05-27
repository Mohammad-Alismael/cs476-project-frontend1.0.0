import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './css/Done.css'
class Done extends Component {
    render() {
        return (
            <div>
                <img src="https://cdn1.iconfinder.com/data/icons/warnings-and-dangers/400/Warning-02-512.png"/>
                    <p id="s">success</p>
                    <p id="check">you have been logged in Successfully</p>
                    <button onClick="btn()">done !</button>
            </div>
        );
    }
}

Done.propTypes = {};

export default Done;