import React, {Component} from 'react';

import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
} from 'chart.js';
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import axios from "axios";
import {toast} from "react-toastify";

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);
// import { Doughnut } from 'react-chartjs-2';
class DashBoard extends Component {
    state = {
        Cpu : 0,
        Gpu : 0,
        MotherBoard : 0,
        Apple : 0,
        Monitor : 0,
    }
    chartRef = React.createRef();
    AmountOFProductsChart = React.createRef();
    getChartData(){
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:5001/api/products/getLinkedProducts/${parseInt(sessionStorage.getItem('user_id'))}`)
                .then((res) => {
                    resolve(res.data)
                }).catch(error => {
                toast.error("error happened fetching product manager data")
                console.log(error)
            })
        })
    }

    componentDidMount() {
        this.getChartData().then((data)=>{
            data.map((val,index)=>{
                if (val.category == "1")
                    this.setState({Cpu : this.state.Cpu + 1})
                if (val.category == "2")
                    this.setState({Gpu : this.state.Gpu + 1})
                if (val.category == "3")
                    this.setState({Motherboard : this.state.Motherboard + 1})
                if (val.category == "4")
                    this.setState({Apple : this.state.Apple + 1})
                if (val.category == "5")
                    this.setState({Monitor : this.state.Monitor + 1})

            })
            const {Cpu, Gpu, Motherboard, Apple, Monitor} = this.state;
            console.log(this.state)
            new Chart(myChartRef, {
                type: 'bar',
                data: {
                    labels: ['CPU', 'GPU', 'MotherBoard', 'Apple', 'Monitor'],
                    datasets: [{
                        label: 'amount of Products',
                        data: [Cpu, Gpu, Motherboard, Apple, Monitor],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            suggestedMin: 0,
                            suggestedMax: 50
                        }
                    }
                }
            });
        })
        const myChartRef = this.chartRef.current.getContext("2d");



        // const AmountOFProductsChart = this.chartRef.current.getContext("2d");
        // new Chart(myChartRef, {
        //     type: 'pie',
        //     data: {
        //         labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        //         datasets: [
        //             {
        //                 label: 'Dataset 1',
        //                 data: [15, 17, 9, 11, 4, 7],
        //                 backgroundColor: [
        //                     'rgba(255, 99, 132, 0.2)',
        //                     'rgba(54, 162, 235, 0.2)',
        //                     'rgba(255, 206, 86, 0.2)',
        //                     'rgba(75, 192, 192, 0.2)',
        //                     'rgba(153, 102, 255, 0.2)',
        //                     'rgba(255, 159, 64, 0.2)'
        //                 ],
        //                 borderColor: [
        //                     'rgba(255, 99, 132, 1)',
        //                     'rgba(54, 162, 235, 1)',
        //                     'rgba(255, 206, 86, 1)',
        //                     'rgba(75, 192, 192, 1)',
        //                     'rgba(153, 102, 255, 1)',
        //                     'rgba(255, 159, 64, 1)'
        //                 ]
        //             }
        //         ]
        //     },
        //     options: {
        //         title: {
        //             display: true,
        //             text: 'Chart.js Pie Chart'
        //         }
        //     }
        // });
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Card style={{width: '110%',marginLeft: '10%'}} body>
                        <CardTitle tag="h3">Amount of products</CardTitle>
                        <CardBody>
                            <Col>
                                <canvas id="myChart" width="1000" height="600"  ref={this.chartRef}></canvas>
                            </Col>
                        </CardBody>
                    </Card>
                    {/*<Card  style={{width: '110%'}}>*/}
                    {/*    <Col>*/}
                    {/*        /!*<Doughnut data={[2,63,21,1221,3]} />*!/*/}
                    {/*    </Col>*/}
                    {/*</Card>*/}
                </Row>
                <Row>
                    <Card  style={{width: '110%',marginLeft: '10%',marginTop: '5%'}} body>
                        <CardTitle tag="h3">Sales Report</CardTitle>
                        <CardBody>
                            <Table striped>
                                <thead>
                                <tr>
                                    <th>Last Transaction Date</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Number of Purchases</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>

                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Row>
            </div>
                );
    }

}


export default DashBoard;