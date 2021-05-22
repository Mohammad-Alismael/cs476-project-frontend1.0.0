import React, {Component} from 'react';

class FundPage extends Component {
    render() {
        return (
            <div>
                <h1>Lets give you some funds</h1>
                <h2>Choose an amount to add to your wallet:</h2>
                <select id="cars" name="cars">
                    <option value="10">10TL</option>
                    <option value="20">20TL</option>
                    <option value="50">50TL</option>
                    <option value="100">100TL</option>
                    <option value="200">200TL</option>
                    <option value="500">500TL</option>
                    <option value="1000">1000TL</option>
                </select><br/>
                <input type="submit" name="submit" value="Submit"/>
                    <h2>Click the "Submit" button to receive the selected TL to your wallet.</h2>
            </div>
        );
    }
}

export default FundPage;
