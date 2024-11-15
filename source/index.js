import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './app';
// root.render(<App />);
const root = createRoot(document.getElementById('App'));
root.render(<BrowserRouter><App/></BrowserRouter>)
