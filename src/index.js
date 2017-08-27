import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import AppContainer from './containers/AppContainer';
import rootReducer from './reducers';

const store = createStore(
  rootReducer
);

ReactDOM.render((
  <Provider store={store}>
    <AppContainer />
  </Provider>
), document.getElementById('root'));
