import React, { useEffect, useState } from "react";
import "../source/css/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import LineGraph from "../source/components/lineGraph.js"
export default function App() {
  const [data, setData] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch("/gdp.json");
    setData(await response.json());
  };

  return (
    <div className="App">
      <LineGraph/>
    </div>
  );
}
