import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/styles.css';
import CV from './components/CV';
import Data from './content';
import Export from './components/Export';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Export>
      <CV {...Data} />
    </Export>
  </Provider>,
  global.document.getElementById('root'),
);
