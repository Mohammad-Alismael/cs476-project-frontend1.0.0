import React, {Component} from 'react';

class FundPage extends Component {
    render() {
        return (
            <div>
              <h1 class="page-header">Lets give you some funds</h1>
              <form>
                  <h2>Choose an amount to add to your wallet:</h2>
                  <div>
                  <select name="Value" id="Value" style="">
                    <option value="10">10TL</option>
                    <option value="50">50TL</option>
                    <option value="100">100TL</option>
                  </select>
                  </div>
                  <br></br>
                  <input type="submit" value="Submit" width="50%"/>
              </form>
              <h2>Click the "Submit" button to recieve the selected TL to your wallet.</h2>
            </div>
        );
    }
}

export default FundPage;
