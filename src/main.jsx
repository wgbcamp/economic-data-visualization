import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import "./main.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// provides a root to display react components inside the browser DOM
const root = createRoot(document.getElementById('root'));

// renders the root component 
root.render(
    <StrictMode>
        <App/>
    </StrictMode>
)
