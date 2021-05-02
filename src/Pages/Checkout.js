import React, {Component} from 'react';

class Checkout extends Component {
    render() {
        return (
                <section class="payment-form dark">
                    <div class="container">
                            <div class="card-details">
                                <h3 class="title">User Information</h3>
                                <div class="row">
                                    <div class="form-group col-sm-7">
                                        <label for="full-name">Full-Name</label>
                                        <input id="full-name" type="text" class="form-control" placeholder="Full-Name" aria-label="Full-Name" aria-describedby="basic-addon1"/>
                                    </div>
                                    <div class="form-group col-sm-5">
                                        <label for="city">City</label>
                                        <input id="city" type="text" class="form-control" placeholder="City" aria-label="City" aria-describedby="basic-addon1"/>
                                    </div>
                                </div>
                                <div class="form-group col-sm-12">
                                    <label for="address">Address</label>
                                    <input id="address" type="text" class="form-control"  placeholder="Address" aria-label="Address" aria-describedby="basic-addon1"/>
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="zip-code">Zip code</label>
                                    <input id="zip-code" type="number" class="form-control" placeholder="Zip Code" aria-label="Zip Code" aria-describedby="basic-addon1"/>
                                </div>
                                <div class="form-group col-sm-9">
                                    <label for="email-address">Email Address</label>
                                    <input id="email-address" type="email" class="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="basic-addon1"/>
                                </div>
                                <div class="form-group col-sm-12">
                                    <button type="button" class="btn btn-primary btn-block">Proceed</button>
                                </div>
                            </div>
                    </div>

    </section>
        );
    }
}

export default Checkout;