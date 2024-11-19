import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Form, } from 'react-bootstrap';
import Highcharts, { dateFormat } from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import Exporting from 'highcharts/modules/exporting'
import ExportData from 'highcharts/modules/export-data'
import OfflineExporting from 'highcharts/modules/offline-exporting'

const lineGraph = (props) => {

    // create a reference for the Highcharts component
    const chartRef = useRef(null);

    // store the value of the name of the filter currenty applied
    const [filter, setFilter] = useState("GDP (USD Billion)");

    
    const handleFilterChange = (event) => {
        const chart = chartRef.current.chart;

        // reset status of all checkboxes to checked
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox, index) => {
                chart.series[index].show()  
        });

        // update all chart series data values to their original color before
        // new data values are drawn on chart
        for (var i=0; i<chart.series.length; i++) {
            for (var a=0; a<chart.series[i].data.length; a++) {
                chart.series[i].data[a].update({ color: null });
            }
   
        }

        // call parent function to request new series of data
        props.getJson(event.slice(0,3));
        setFilter(event);
    }


    
    // mark the highest and lowest points of each series data array by color
    function setMarkers() {
        var x = props.data;
        if (x) {
            for (var i=0; i<x.length; i++) {
                var y = [];
                for (var a=0; a<x[i].data.length; a++) {

                    // push number data values to new array
                    y.push(x[i].data[a][1]);
                    const chart = chartRef.current.chart;
                    if (a === x[i].data.length-1) {

                        // update the chart series data containing values that
                        // matches the highest and lowest values of y array and
                        // set data points to unique colors
                        chart.series[i].data[y.indexOf(Math.max(...y))].update({color: "black"});
                        chart.series[i].data[y.indexOf(Math.min(...y))].update({color: "darkred"});
                        console.log(`HIGHEST ${Math.max(...y)}`);
                    }

                }      

            }
        }
    }

    // run setMarkers() when component mounts or data values change
    useEffect(() => {
        setMarkers();
    }, [props.data]);
      
      // Initialize highcharts exporting module
      Exporting(Highcharts);
      ExportData(Highcharts);
      OfflineExporting(Highcharts);
      
      // set Highcharts csv download option
       useEffect(() => {
        Highcharts.setOptions({
            lang: {
                downloadCSV: 'Download CSV',
            }
        })
       })

       // download csv function 
       function downloadCSV() {
        const chart = chartRef.current.chart;
        chart.downloadCSV();
       }

       // options for visualizing Highcharts chart
      const options = {
        chart: {
            style: {
                fontFamily: '"Figtree"'
            },
            borderRadius: 20,
            height: 725,
            marginRight: 50,
            borderColor: '#334eff',
            reflow: true
        },
        navigator: {
            enabled: true
        },
        responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500,
                },
              },
            ],
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
          exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                  menuItems: ["viewFullscreen",
                              "printChart",
                              "separator",
                              "downloadPNG",
                              "downloadJPEG",
                              "downloadPDF",
                              "downloadSVG",
                              "separator",
                              "downloadCSV",
                              "downloadXLS",
                            ]
                }
              }
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
            text: 'Source: IMF World Economic Outlook (October 2024)',
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
                    checkboxClick: function () {

                        // mark all checkboxes with numerically ordered ids
                        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                        checkboxes.forEach(
                            (checkbox, index) => {
                                checkbox.id = `checkbox-${index + 1}`;
                            }
                        )
                        if (chartRef.current) {
                            const chart = chartRef.current.chart;

                            // hide or display chart series values based on the
                            // checked status of each checkbox
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

                // remove item click function from legend icons
                itemClick: function () {
                    return false;
                }
            },
            itemCheckboxStyle: {
                marginTop: '4px',
                accentColor: '#f9355d'
            }
        },
        tooltip: {

            // format tooltip with relevant information
            formatter: function () {
                return `<div style="font-size: 15px;font-weight: bold">
                ${this.series.name}</div>` + '<br> <br> <b>Year: </b>' + 
                dateFormat('%Y', this.key) + `<br> <b>${filter}:</b> ${this.y}`
                
            }
        }
    }

    return(
        <div>
            <div className='svgHeightReduce'>
                <svg viewBox="25 8 90 105" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="blurEffect" x="0" y="0" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
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
                            <div className="boxShadow highcharts-light">
                                <HighchartsReact 
                                    highcharts={Highcharts}
                                    constructor={'stockChart'}
                                    options={options}
                                    ref={chartRef}
                                />
                            </div>
                        </div>
                    </div>

            <Container>
                <Row>
                    <h1 className='chartTitle'>Economic Data Visualization</h1>
                </Row>
                <Row className='mx-5'>
                    <div className='chartDescription pt-4'>Analysis of a dataset containing 
                        economic indicators 
                        across multiple countries over a series of years.</div>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="justify ">
                            <h3 className='title pt-5 toGray'>Filter</h3>
                            <Form.Control className="w-75 buttonShadow" as="select" 
                            onChange={(e) => handleFilterChange(e.target.value)}>
                                <option value="GDP (USD Billion)">GDP (USD Billion)</option>
                                <option value="Inflation Rate (Annual Percentage Change)">
                                    Inflation Rate (Annual Percentage Change)</option>
                                <option value="Unemployment Rate (%)">Unemployment Rate (%)</option>
                            </Form.Control>
                        </div>
                    </Col>

                    <Col sm={12} md={6}>
                        <div className="justify toGray paddingTitle">
                            <h3 className='title pt-5'>Export to .csv file</h3>
                            <button className="buttonFix w-75 buttonShadow" 
                                onClick={() => downloadCSV()}>
                                <i className="fa-solid fa-file-export fa-xl"></i>
                            </button>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default lineGraph;