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
import {Card, Col, Row} from "reactstrap";

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
class DashBoard extends Component {
    chartRef = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
         new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: ['CPU', 'GPU', 'MotherBoard', 'RAM', 'Case', 'SSD'],
                datasets: [{
                    label: '# of Products',
                    data: [15, 17, 9, 11, 4, 7],
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
                        beginAtZero: true
                    }
                }
            }
        });
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Card className={".mx-auto"} style={{width: '110%'}}>
                    <Col >
                        <canvas id="myChart" width="1000" height="600"  ref={this.chartRef}></canvas>
                    </Col>
                    </Card>
                </Row>
            </div>
                );
    }

}


export default DashBoard;