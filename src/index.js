import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './router'; import Store from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'

const persist = persistStore(Store)
const renders = () => {
  return (<React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  renders()
);