import 'styled-components';
import { DOMAttributes } from 'react';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      textColor: string;
      bgColor: string;
      accentColor: string;
      accentColorLight: string;
      lightGrey: string;
      darkGrey: string;
      charcol: string;
    };
    device: {
      desktop: string;
      tablet: string;
      mobile: string;
    };
  }
}

// declare namespace React {
//   interface HTMLAttributes<T> extends DOMAttributes<T> {
//     css?: any;
//   }
// }
