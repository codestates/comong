import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  * {
    box-sizing: border-box;
  }

  main {
    position: relative;
  }

  a{
    text-decoration: none;
    color:inherit;
  }

  button{
    border: none;
  }
`;

export default GlobalStyles;
