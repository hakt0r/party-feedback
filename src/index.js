import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'
import actions from './actions';

const store = createStore(
  actions
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
