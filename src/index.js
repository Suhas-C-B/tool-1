import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Canvas1 from './pages/canvas1';
import Practice from './pages/practice';
import Canvas from './pages/canvas';
import Home from './pages/Home';
import FileList from './components/FileList';
import reportWebVitals from './reportWebVitals';
import Model from './pages/Model'
import Inputbox from './components/inputbox';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Canvas1 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();