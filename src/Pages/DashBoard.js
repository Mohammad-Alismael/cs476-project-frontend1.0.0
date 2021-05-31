import React, {Component,Suspense} from 'react';

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
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Spinner, Table} from "reactstrap";
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
        loading: 'initial',
        salesReportData: []
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

    getSalesReportData(){
        return new Promise((resolve, reject) => {
            this.getUsername(parseInt(sessionStorage.getItem('user_id')))
                .then((data)=>{
                    axios.get(`https://localhost:5001/api/sales/getSales/${parseInt(sessionStorage.getItem('user_id'))}`)
                        .then((res) => {
                            resolve(res.data)
                        }).catch(error => {
                        toast.error("error happened fetching sales report data")
                        console.log(error)
                    })
            })
           
        })
    }
    componentDidMount() {
        this.setState({ loading: 'true' });
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

            this.getSalesReportData().then((data)=>{
                console.log(data)
                data.map((val,indexed)=>{
                    const tmp = {}
                    tmp.id = val.id;
                    tmp.price = val.price;
                    tmp.amount = val.amount;
                    this.getUsername(val.userId).then((username)=>{
                        tmp.username1 = username;
                    })
                    this.getProductName(parseInt(val.productId)).then((productName)=>{
                        tmp.productName1 = productName;
                    })
                    console.log("checking",tmp)
                    this.setState({salesReportData: [...this.state.salesReportData, tmp]},function () {
                        console.log("the new sales report data", this.state.salesReportData)
                    })
                    this.setState({
                        loading: 'false'
                    });
                })
            })


        })

        const myChartRef = this.chartRef.current.getContext("2d");

    }

    getUsername(userId) {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:5001/api/users/${userId}`)
                .then((res) => {
                    resolve(res.data.userName)
                }).catch(error => {
                toast.error("error happened fetching username data")
                console.log(error)
            })
        })
    }

    getProductName(productId) {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:5001/api/products/${productId}`)
                .then((res) => {
                    resolve(res.data.productName)
                }).catch(error => {
                toast.error("error happened fetching username data")
                console.log(error)
            })
        })
    }

    loadTable(){
        if (this.state.loading === 'initial') {
            return (
                <div>
                    <Spinner color="danger" style={{ width: '20rem', height: '20rem',marginLeft: '45%',marginTop: '10%',marginBottom: '10%' }}/>
                </div>
            );
        }else if(this.state.loading === 'true'){
            return (
                <div>
                    <Spinner color="black" style={{ width: '20rem', height: '20rem',marginLeft: '45%',marginTop: '10%',marginBottom: '10%' }}/>
                </div>
            );
        }else {
            return (
            <Table striped responsive>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Username(buyer)</th>
                    <th>Product Name</th>
                    <th>amount</th>
                    <th>price</th>
                    <th>Revenue</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.salesReportData.map((val,index)=>{
                        return (
                            <tr key={val.id}>
                                <th scope="row">{index+1}</th>
                                <td>{val.username1}</td>
                                <td>{val.productName1}</td>
                                <td>{val.amount}</td>
                                <td>{val.price}</td>
                                <td>{val.price * val.amount}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            )
        }
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
                </Row>
                <Row>
                        <Card  style={{width: '110%',marginLeft: '10%',marginTop: '5%',height:'600px',overflow: 'scroll'}} body>
                            <CardTitle tag="h3">Sales Report</CardTitle>
                            <CardBody>
                                {this.loadTable()}
                            </CardBody>
                        </Card>
                </Row>
            </div>
                );
    }


}


export default DashBoard;