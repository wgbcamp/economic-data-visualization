import React, { useEffect, useState } from "react";
import "../source/css/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import LineGraph from "../source/components/lineGraph.js"
export default function App() {
  const [data, setData] = useState();

  useEffect(() => {
    loadData();
  }, []);

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
    console.log(`/${value}.json`)
    // fetch json
    const response = await fetch(`/${value}.json`, { method: 'GET' });
    var x = await response.json();
    console.log(x);
    // parse the dates
    for (var i=0; i<x.length; i++) {
      console.log(x[i].data)
      for (var a=0; a<x[i].data.length; a++) {
        console.log(x[i].data[a][0])
        x[i].data[a].splice(0, 1, Date.parse(x[i].data[a][0]))
      }
    }
    // mark the highest and lowest values
    console.log("NEW X")
    console.log(x)
        setData(x);

    
  };

  return (
    <div className="App">
      <LineGraph getJson={loadData} data={data}/>
    </div>
  );
}
