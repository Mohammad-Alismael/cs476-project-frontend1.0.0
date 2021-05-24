import React, {Component} from 'react';

class FundPage extends Component {
    render() {
        return (
            <div className={'fundPageDiv'}>
                <section className="white-section" id="pricing">
                    {/*<h2 className="section-heading">Please choose how much money you would like to upload</h2>*/}
                    <div className="row">
                        <div className="pricing-column col-lg-4 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h3>10₺</h3>
                                </div>
                                <div className="card-body">
                                    <h2 className="price-text">10 TL will be transferred to your account</h2>
                                    <p>You cannot earn extra shopping points</p>
                                    <button className="btn btn-lg btn-block btn-dark" type="button">Submit</button>
                                </div>
                            </div>
                        </div>

                        <div className="pricing-column col-lg-4 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h3>20₺</h3>
                                </div>
                                <div className="card-body">
                                    <h2 className="price-text">20 TL will be transferred to your account</h2>
                                    <p>You can earn 0.2TL extra shopping points</p>

                                    <button className="btn btn-lg btn-block btn-dark" type="button">Submit</button>
                                </div>
                            </div>
                        </div>

                        <div className="pricing-column col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h3>50₺</h3>
                                </div>
                                <div className="card-body">
                                    <h2 className="price-text">50 TL will be transferred to your account</h2>
                                    <p>You can earn 0.6TL extra shopping points</p>
                                    <button className="btn btn-lg btn-block btn-dark" type="button">Submit</button>

                                </div>
                            </div>
                        </div>
                        <div className="pricing-column col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h3>100₺</h3>
                                </div>
                                <div className="card-body">
                                    <h2 className="price-text">100 TL will be transferred to your account</h2>
                                    <p>You can earn 1.3TL extra shopping points</p>
                                    <button className="btn btn-lg btn-block btn-dark" type="button">Submit</button>

                                </div>
                            </div>
                        </div>
                        <div className="pricing-column col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h3>200₺</h3>
                                </div>
                                <div className="card-body">
                                    <h2 className="price-text">200 TL will be transferred to your account</h2>
                                    <p>You can earn 2.7TL extra shopping points</p>
                                    <button className="btn btn-lg btn-block btn-dark" type="button">Submit</button>

                                </div>
                            </div>
                        </div>
                        <div className="pricing-column col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h3>500₺</h3>
                                </div>
                                <div className="card-body">
                                    <h2 className="price-text">500 TL will be transferred to your account</h2>
                                    <p>You can earn 5.5TL extra shopping points</p>
                                    <button className="btn btn-lg btn-block btn-dark" type="button">Submit</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default FundPage;
