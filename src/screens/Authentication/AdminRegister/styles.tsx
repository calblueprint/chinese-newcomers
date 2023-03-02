import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scale = windowWidth / 390;
const leftMargin = '7%';

export default StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  keyboardviewContainer: {
    width: '100%',
    height: '70%',
  },
  logoContainer: {
    width: '100%',
    height: windowHeight * 0.13,
    justifyContent: 'flex-start',
    marginLeft: leftMargin,
    marginTop: '15%',
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    width: '22%',
  },
  textContainer: {
    width: '80%',
    height: '20%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '8%',
  },
  inputContainer: {
    width: '82%',
    height: 0.26 * windowHeight,
    marginTop: '10%',
    marginLeft: leftMargin,
  },
  buttonContainer: {
    height: windowHeight * 0.05,
    width: '82%',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '6%',
    marginLeft: leftMargin,
  },
  headingText: {
    fontFamily: 'DMSans_500Medium',
    color: '#49260C',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(31 * scale)),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  subText: {
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(20 * scale)),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  smallText: {
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(14 * scale)),
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});
