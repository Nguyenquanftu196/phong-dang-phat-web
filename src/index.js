import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom';
import { AppContainer } from './App.container'
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store';
import './i18n';

ReactDOM.render(
  <Suspense fallback={<div />}>
    <Provider store={configureStore()}>
      <SnackbarProvider maxSnack={3}>
        <AppContainer />
      </SnackbarProvider>
    </Provider>
  </Suspense>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();