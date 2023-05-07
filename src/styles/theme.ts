import * as Button from './buttons';

const palette = {
  red: '#D82D1F',

  black: '#000000',
  white: '#FFFFFF',

  grayLight: '#C2B4B4',
  grayPrimary: '#717171',

  grey: '#A1A1A1',
  bronze: '#49260C',
};

export const theme = {
  colors: {
    background: palette.white,
    cardBackground: palette.grayLight,
    foreground: palette.black,
    primary: palette.red,
    cardHeaderBackground: palette.grayPrimary,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    h1: {
      fontFamily: 'DMSans_700Bold',
      fontSize: 36,
      lineHeight: 60,
      color: '#49260C',
    },
    h2: {
      fontFamily: 'DMSans_700Bold',
      fontSize: 28,
      lineHeight: 47,
      color: '#49260C',
    },
    h3: {
      fontFamily: 'DMSans_700Bold',
      fontSize: 24,
      lineHeight: 40,
      color: '#49260C',
    },
    body1: {
      fontFamily: 'DMSans_500Medium',
      fontSize: 14,
      lineHeight: 23,
      color: '#49260C',
    },
    body2: {
      fontFamily: 'DMSans_400Regular',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 20,
      color: '#49260C',
    },
    logoContainer: {
      height: 100,
      width: 100,
      justifyContent: 'flex-start',
      aspectRatio: 1,
      marginLeft: 35,
      marginTop: 25,
      resizeMode: 'contain',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  buttons: {
    feedStandard: {
      ...Button.small,
      ...Button.rounded,
      ...Button.dropShadow,
    },
  },
  containers: {
    logoContainer: {
      height: 100,
      width: 100,
      // justifyContent: 'flex-start',
      aspectRatio: 1,
      marginLeft: 35,
      marginTop: 25,
      resizeMode: 'contain',
    },
  },
};

export default theme;
