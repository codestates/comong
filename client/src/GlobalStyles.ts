import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  * {
    box-sizing: border-box;
    color:${(props) => props.theme.colors.charcol};
  }

  main {
    padding: 100px 0;
    position: relative;
  }

  h1 {
    font-size: 36px;
    font-weight: 600;

    @media only screen and (max-width: 768px) {
      font-size: 28px;
    }
  }

  h2 {
    font-size: 28px;
    font-weight: 600;

    @media only screen and (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  a {
    text-decoration: none;
    color:inherit;
  }

  button {
    border: none;
  }
`;

export default GlobalStyles;
