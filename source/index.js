import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './app';

// provides a root to display react components inside the browser DOM
const root = createRoot(document.getElementById('App'));

// renders the root component 
root.render(<BrowserRouter><App/></BrowserRouter>)
