import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

import { Provider } from 'react-redux'
import store from './redux/configStore';

test('renders learn react link', () => {
  render(<Provider store={store}><ThemeProvider theme={theme}><App /></ThemeProvider></Provider>);
  const linkElement = screen.getByText("learn react");
  expect(linkElement).toBeInTheDocument();
});