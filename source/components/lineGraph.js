import React, { useState, useEffect, useRef } from 'react'
import Highcharts, { chart, dateFormat } from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import "../css/main.css";
import { Dropdown, Container, Row, Col, Form } from 'react-bootstrap';
import { redirect } from 'react-router-dom';

const lineGraph = (props) => {

    const chartRef = useRef(null);

    const [filter, setFilter] = useState("GDP (USD Billion)");

    const handleFilterChange = (event) => {
        console.log(event.slice(0,3));
        props.getJson(event.slice(0,3));
        setFilter(event);
        const chart = chartRef.current.chart;
        // chart.series[1].hide();
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox, index) => {
                chart.series[index].show()  
        })
    }

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      useEffect(() => {
        function handleResize() {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }

        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      const options = {
        chart: {
            style: {
                fontFamily: '"Figtree"'
            },
            borderRadius: 20,
            height: (windowSize.height * .65),
            marginRight: 50,
            borderColor: '#334eff',
        },
        navigator: {
            enabled: true
        },
        rangeSelector: {
            enabled: true,
            buttons: [{
                type: 'day',
                count: 1,
                text: '1d'
              },
              {
                type: 'week',
                count: 1,
                text: '1w'
              },
              {
                type: 'month',
                count: 1,
                text: '1m'
              },
              {
                type: 'month',
                count: 3,
                text: '3m'
              },
              {
                type: 'month',
                count: 6,
                text: '6m'
              },
              {
                type: 'year',
                count: 1,
                text: "1y"
              },
              {
                type: 'all',
                text: 'All'
              }
            ]
          },
        responsive: {
            rules: [{
                condition: {
                }
            }]
        },
        title: {
            text: filter,
            style: {
                color: "#636363",
            }
        },
        subtitle: {
            text: 'Source: IMF World Economic Outlook (October 2024)'
        },
        series: props.data,
        credits: {
            enabled: false
        },
        xAxis: {
            crosshair: {
                snap: true
            },
            minRange: 5,
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
                allowPointSelect: true,
                showCheckbox: true,
                events: {
                    checkboxClick: function (event) {
                        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                        checkboxes.forEach(
                            (checkbox, index) => {
                                checkbox.id = `checkbox-${index + 1}`;
                            }
                        )
                        checkboxes.forEach((checkbox, index) => {
                            if (checkbox.checked){
                                console.log(`Checkbox with ID ${index} is clicked`);
                            } else {
                                console.log(`Checkbox with ID ${index} is NOT clicked`);
                            }
                        })
                        if (chartRef.current) {
                            const chart = chartRef.current.chart;
                            // chart.series[1].hide();
                            checkboxes.forEach((checkbox, index) => {
                                if (!checkbox.checked){
                                    chart.series[index].hide()
                                } else {
                                    chart.series[index].show()
                                }
                            })
                        }
                    }
                }
            }
        },
        legend: {
            events: {
                itemClick: function () {
                    return false;
                }
            },
            itemCheckboxStyle: {
                marginTop: '4px',
                accentColor: '#f9355d',
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

    return(
        <div>
            <div className='test'>
                <svg viewBox="25 8 90 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="blurEffect" x="0" y="0" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                        </filter>
                    </defs>
                    <g filter="url(#blurEffect)">
                        <circle cx="10" cy="35" r="30" fill="#fad196" />
                        <circle cx="120" cy="70" r="30" fill="#f5bcb7" />
                    </g>
                </svg>
            </div> 
                    <div className="chartFlex">
                        <div className="chartContainer">
                            <div className="boxShadow">
                                <HighchartsReact  
                                    className="restrict"
                                    highcharts={Highcharts}
                                    constructor={'stockChart'}
                                    options={options}
                                    ref={chartRef}
                                />
                            </div>
                        </div>
                    </div>

            <Container className=''>
                <Row>
                    <h1 className='chartTitle'>Economic Data Visualization</h1>
                </Row>
                <Row className='mx-5'>
                    <div className='chartDescription pt-4'>Analysis of a dataset containing 
                        economic indicators 
                        across multiple countries over a series of years.</div>
                </Row>
                <Row>
                    <h3 className='title pt-5'>Filter</h3>
                </Row>
                <Row>
                    <Form.Control className="w-50" as="select" onChange={(e) => 
                        handleFilterChange(e.target.value)}>
                        <option value="GDP (USD Billion)">GDP (USD Billion)</option>
                        <option value="Inflation Rate (Annual Percentage Change)">Inflation Rate (Annual Percentage Change)</option>
                        <option value="Unemployment Rate (%)">Unemployment Rate (%)</option>
                    </Form.Control>
                </Row>
                
            </Container>

        </div>
    )
}

export default lineGraph;