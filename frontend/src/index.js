import React from 'react';
import ReactDOM from 'react-dom/client';

import store from './redux/store'

import './index.css';
import './bootstrap.min.css'


import { Provider } from 'react-redux'

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <App />
    </Provider>
  </React.StrictMode>
);

