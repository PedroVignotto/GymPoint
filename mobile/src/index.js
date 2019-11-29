import React from 'react';
import { StatusBar } from 'react-native';
import { Toast } from 'react-native-redux-toast';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <App />
          <Toast
            messageStyle={{ color: '#fff' }}
            warningStyle={{ backgroundColor: '#07BC0C' }}
          />
        </>
      </PersistGate>
    </Provider>
  );
}
