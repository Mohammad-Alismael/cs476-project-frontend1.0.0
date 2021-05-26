import React, {Component} from 'react';
import {Card, Row} from "reactstrap";
import FundCards from "../Components/FundCards";
import './css/FundPaage.css'
class FundPage extends Component {
    render() {
        return (
            <Row className={'fundPageDiv'}>
                <section className="white-section" id="pricing">
                    {/*<h2 className="section-heading">Please choose how much money you would like to upload</h2>*/}
                    <Row>
                        <FundCards price={10} percentageMore={0.05}/>
                        <FundCards price={20} percentageMore={0.10}/>
                        <FundCards price={50} percentageMore={0.15}/>
                        <FundCards price={100} percentageMore={0.20}/>
                        <FundCards price={200} percentageMore={0.25}/>
                        <FundCards price={500} percentageMore={0.30}/>

                    </Row>
                </section>
            </Row>
        );
    }
}

export default FundPage;
