import 'bootstrap/dist/css/bootstrap.min.css';
import * as d3 from "d3";
import LinePlot from './components/linePlot.js';

import React, {useState, useEffect, createRef} from 'react'
import { Routes, Route } from 'react-router-dom'
import './css/main.module.css';

import Homepage from './components/linePlot.js'

export default function App() {  
    return (
      <div>
        <LinePlot/>
      </div>
    );
  }
