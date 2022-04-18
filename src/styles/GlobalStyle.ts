import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
   *, html, body {
    font-family: 'Source Sans Pro', sans-serif;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
