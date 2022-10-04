import * as Button from "./buttons";

const palette = {
    red: '#E13C3C',

    black: '#000000',
    white: '#FFFFFF',

    grayLight: '#C2B4B4',
    grayPrimary: '#717171',

    green: '#0ECD9D'
}

export const theme = {
    colors: {
        background: palette.white,
        cardBackground: palette.grayLight,
        foreground: palette.black,
        primary: palette.red,
        cardHeaderBackground: palette.grayPrimary,
        success: palette.green,
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
    },
    textVariants: {
        header: {
            fontFamily: 'Avenir',
            fontSize: 36
        },
        body: {
            fontFamily: 'Avenir',
            fontSize: 16
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
}

export default theme;