import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Router from './Router';
import { Store } from './storeConfig'
import ScrollToTop from './components/Scroll-to-top'
ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
    <ScrollToTop>
      <Router/>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>

, document.getElementById('root'));
