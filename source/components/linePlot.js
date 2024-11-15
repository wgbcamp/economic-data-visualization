import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";


const LinePlot = () => {

  const ref = useRef();

  useEffect(() => {
    
    // set dimensions and margins of the graph
    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    // provides data for line graph
    
    const GDP = [
      {date: new Date("2023-01-01"), close: 10},
      {date: new Date("2023-04-01"), close: 25},
      {date: new Date("2023-10-01"), close: 70},
    ];

    const inflationRate = [
      {date: new Date("2023-02-01"), close: 5},
      {date: new Date("2023-07-01"), close: 40},
      {date: new Date("2023-11-01"), close: 90},
    ];

    const unemploymentRate = [
      {date: new Date("2023-01-20"), close: 30},
      {date: new Date("2023-05-15"), close: 60},
      {date: new Date("2023-12-22"), close: 95},
    ];

    // declare the line generator
    const line = d3.line()
    .x((d) => x(d.date))
    .y((d) => y(d.close));

    // declare the x scale
    const x = d3.scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight]);

    // declare the y scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

    // create the svg container
    const svg = d3
    .select(ref.current)
    .attr("width", width)
    .attr("height", height);

    // add the x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

    // add the y-axis
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

    // generates the first line with given data
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", line(GDP))

    // generates the second line with given data
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line(inflationRate))

    // generates the third line with given data
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("id", "HELLO")
      .attr("d", line(unemploymentRate))

    // generates symbols for data points
    svg.selectAll()
      .data(GDP)
      .enter()
      .append("path")
        .attr("d", d3.symbol(d3.symbolCross))
        .attr("transform", d => `translate(${x(d.date)},${y(d.close)})`)
        .attr("fill", "orange")

    svg.selectAll()
    .data(inflationRate)
    .enter()
    .append("path")
      .attr("d", d3.symbol(d3.symbolStar))
      .attr("transform", d => `translate(${x(d.date)},${y(d.close)})`)
      .attr("fill", "steelblue")

    svg.selectAll()
      .data(unemploymentRate)
      .enter()
      .append("path")
        .attr("d", d3.symbol(d3.symbolSquare))
        .attr("transform", d => `translate(${x(d.date)},${y(d.close)})`)
        .attr("fill", "green")

  }, []);


  return (
    <svg width={500} height={400} ref={ref}/>
  );
  
  } 
  
  
export default LinePlot;