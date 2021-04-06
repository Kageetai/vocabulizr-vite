import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TagManager from 'react-gtm-module';

import App from './components/App';
import './index.css';
import store from './store';
import './utils/array';

TagManager.initialize({
  gtmId: import.meta.env.VITE_GTM_ID as string,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
