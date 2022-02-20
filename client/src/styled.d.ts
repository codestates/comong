import 'styled-components';
import { DOMAttributes } from 'react';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      textColor: string;
      bgColor: string;
      accentColor: string;
      accentColorMiddle: string;
      accentColorLight: string;
      whiteForShadow: string;
      greyForBackGround: string;
      greyForMenu: string;
      lightGrey: string;
      darkGrey: string;
      charcol: string;
    };
  }
}
