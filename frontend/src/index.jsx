import React from 'react';
import Component from './App';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('container');

const root = ReactDOM.createRoot(container);
root.render(<Component />);
