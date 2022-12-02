import * as Button from './buttons';

const palette = {
  red: '#E13C3C',

  black: '#000000',
  white: '#FFFFFF',

  grayLight: '#C2B4B4',
  grayPrimary: '#717171',

  green: '#0ECD9D'
};

export const theme = {
  colors: {
    background: palette.white,
    cardBackground: palette.grayLight,
    foreground: palette.black,
    primary: palette.red,
    cardHeaderBackground: palette.grayPrimary,
    success: palette.green
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40
  },
  textVariants: {
    h1: {
      fontFamily: 'Quasimoda',
      fontWeight: 600,
      fontSize: 36,
      lineHeight: 60,
      color: '#49260C'
    },
    h2: {
      fontFamily: 'Quasimoda',
      fontWeight: 600,
      fontSize: 28,
      lineHeight: 47,
      color: '#49260C'
    },
    h3: {
      // fontFamily: 'Quasimoda',
      // fontWeight: 600,
      fontSize: 24,
      lineHeight: 40,
      color: '#49260C'
    },
    body1: {
      fontFamily: 'Quasimoda',
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 23,
      color: '#49260C'
    },
    body2: {
      fontFamily: 'Quasimoda',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 20,
      color: '#49260C'
    }
  },
  breakpoints: {
    phone: 0,
    tablet: 768
  },
  buttons: {
    feedStandard: {
      ...Button.small,
      ...Button.rounded,
      ...Button.dropShadow
    }
  }
};

export default theme;
