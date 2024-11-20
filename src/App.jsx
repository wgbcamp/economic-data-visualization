import React, { useEffect, useState } from "react";
import LineGraph from "./lineGraph.jsx"

export default function App() {

  // holds .json array after being formatted by loadData()
  const [data, setData] = useState();

  // load data to send to LineGraph component
  useEffect(() => {
    loadData();
  }, []);

  // determine which .json file to fetch
  const loadData = async (value) => {
    if (value === "GDP") {
        value = "gdp";
    } else if (value === "Inf") {
        value = "inflation";
    } else if (value === "Une") {
        value = "unemploy";
    } else {
      value = "gdp";
    }

    // fetch json
    const response = await fetch(`/${value}.json`, { method: 'GET' });
    var x = await response.json();

    // replace the date array values with unix epoch time for
    // compatibility with the Highcharts x axis in the LineGraph component
    for (var i=0; i<x.length; i++) {
      console.log(x[i].data)
      for (var a=0; a<x[i].data.length; a++) {
        console.log(x[i].data[a][0])
        x[i].data[a].splice(0, 1, Date.parse(x[i].data[a][0]))
      }
    }
        setData(x);
  };

  return (
    <div className="App">
      <LineGraph getJson={loadData} data={data}/>
    </div>
  );
}
