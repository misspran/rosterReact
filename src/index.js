import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
// Importing the fetch polyfill allows cypress to intercept fetch api requests.
// Change me if you prefer sass,scss, less. (Note you may need to update the build config)
import './index.css';
import Routes from './components/Routes';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>
  ,
  document.getElementById('root'),
);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
