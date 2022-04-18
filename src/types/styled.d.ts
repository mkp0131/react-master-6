import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string;
      secondary: string;
      border: string;
      link: string;
      button: string;
    };
    background: {
      primary: string;
      secondary: string;
      button: string;
    };
  }
}
