import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      textColor: string;
      bgColor: string;
      accentColor: string;
      accentColorLight: string;
      lightGrey: string;
      darkGrey: string;
    };
    device: {
      desktop: string;
      tablet: string;
      mobile: string;
    };
  }
}
