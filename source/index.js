import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app';
import "../source/css/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// provides a root to display react components inside the browser DOM
const root = createRoot(document.getElementById('App'));

// renders the root component 
root.render(<App/>)
