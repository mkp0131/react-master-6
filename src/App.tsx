import Motion from 'Motion';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import { lightTheme } from 'styles/theme';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Motion />
    </ThemeProvider>
  );
}

export default App;
