import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/configStore';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

import { LoadingIndicator } from './constants';
import { useAppDispatch, useAppSelector } from './redux/configStore.hooks';
import type { RootState } from './redux/configStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
