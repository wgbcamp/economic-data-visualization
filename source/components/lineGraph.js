import React from 'react'
import Highcharts, { dateFormat } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import "../css/main.css";

//values must be in the format of yyyy, mm, dd, hh, mm
const values = 
    [["2016-11-15T00:00:00.000Z", 2],
        ["2016-11-16T00:00:00.000Z", 4]]
;

const options = {
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
            return `<div style="font-size: 15px;font-weight: bold">${this.series.name}</div>` + '<br> <br> <b>Year: </b>' + dateFormat('%Y', this.key) + `<br> <b>Value:</b> ${this.y}`
            
        }
    }
}

const lineGraph = () => {
    return(
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default lineGraph;