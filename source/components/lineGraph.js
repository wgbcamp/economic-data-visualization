import React, { useState, useEffect, useRef } from 'react'
import Highcharts, { dateFormat } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import "../css/main.css";
import { Dropdown, Container, Row, Col, Form } from 'react-bootstrap';


//values must be in the format of yyyy, mm, dd, hh, mm
const values = 
    [["2016-11-15T00:00:00.000Z", 2],
        ["2016-11-16T00:00:00.000Z", 4]]
;

const options = {
    chart: {
        style: {
            fontFamily: '"Figtree"'
        },
        borderRadius: 20,
        height: (3 / 4 * 100) + '%'
    },

    title: {
        text: 'Economic Data Visualization'
    },
    subtitle: {
        text: 'Source: Sameple Dataset'
    },
    series: [
                {
                name: "USA",
                data: [
                    [Date.parse('2010-12-31T23:59:00Z'), 15000], 
                    [Date.parse('2011-12-31T23:59:00Z'), 15500],
                    [Date.parse('2012-12-31T23:59:00Z'), 16000]
                    ],
                },
                {
                name: "Canada",
                data: [
                    [Date.parse('2010-12-31T23:59:00Z'), 1400], 
                    [Date.parse('2011-12-31T23:59:00Z'), 1450],
                    [Date.parse('2012-12-31T23:59:00Z'), 1500]
                    ],
                },
                {
                name: "Germany",
                data: [
                    [Date.parse('2010-12-31T23:59:00Z'), 3300], 
                    [Date.parse('2011-12-31T23:59:00Z'), 3400],
                    [Date.parse('2012-12-31T23:59:00Z'), 3500]
                    ],
                },
                {
                name: "India",
                data: [
                    [Date.parse('2010-12-31T23:59:00Z'), 1700], 
                    [Date.parse('2011-12-31T23:59:00Z'), 1800],
                    [Date.parse('2012-12-31T23:59:00Z'), 1900]
                    ],
                },
                {
                name: "Brazil",
                data: [
                [Date.parse('2010-12-31T23:59:00Z'), 2200], 
                [Date.parse('2011-12-31T23:59:00Z'), 2300],
                [Date.parse('2012-12-31T23:59:00Z'), 2400]
                    ],
                },
            ],
    credits: {
        enabled: false
    },
    xAxis: {
        crosshair: {
            snap: true
        },
        gridLineWidth: 1,
        type: 'datetime',
        labels: {
            format: '{value:%Y}',
        }
    },
    yAxis: {
        crosshair: {
            snap: true
        },
    },
    plotOptions: {
        series: {
            allowPointSelect: true
        }
    },
    tooltip: {
        formatter: function () {
            return `<div style="font-size: 15px;font-weight: bold">
            ${this.series.name}</div>` + '<br> <br> <b>Year: </b>' + 
            dateFormat('%Y', this.key) + `<br> <b>Value:</b> ${this.y}`
            
        }
    }
}

const lineGraph = () => {

    const [filter, setFilter] = useState("GDP (USD Billion)");


    return(
        <div>
            <div className='test'>
                <svg viewBox="25 8 90 150" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="blurEffect" x="0" y="0" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                        </filter>
                    </defs>
                    <g filter="url(#blurEffect)">
                        <circle cx="10" cy="50" r="30" fill="#fad196" />
                        <circle cx="120" cy="70" r="30" fill="#f5bcb7" />
                    </g>
                </svg>
            </div> 
                    <div className="chartFlex">
                        <div className="chartContainer">
                            <div className="boxShadow">
                                <HighchartsReact  
                                    highcharts={Highcharts}
                                    options={options}
                                />
                            </div>
                        </div>
                    </div>

            <Container>
                <Row>
                    <h3 className='title'>Filter</h3>
                </Row>
                <Row>
                    <Form.Select className="" aria-label="Default select 
                    example">
                        <option value="1">GDP (USD Billion)</option>
                        <option value="2">Inflation Rate (%)</option>
                        <option value="3">Unemployment Rate (%)</option>
                    </Form.Select>
                </Row>
                
            </Container>

        </div>
    )
}

export default lineGraph;