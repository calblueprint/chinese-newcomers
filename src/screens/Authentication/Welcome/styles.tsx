import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scale = windowWidth / 390;
console.log(windowWidth);
console.log(scale);
console.log(windowHeight);
const leftMargin = '9%';

export default StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  logoContainer: {
    width: '100%',
    height: '13%',
    justifyContent: 'flex-start',
    marginLeft: leftMargin,
    marginTop: '8%'
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    width: '22%'
  },
  textContainer: {
    width: '76%',
    height: '25%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '35%'
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '38%',
    alignItems: 'center',
    marginTop: '22%'
  },
  welcomeText: {
    fontFamily: 'DMSans_500Medium',
    color: '#49260C',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(30 * scale)),
    fontWeight: '500',
    letterSpacing: 0.5
  },
  subText: {
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(16 * scale)),
    fontWeight: '400'
  },
  orText: {
    color: '#CC433C',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(18 * scale)),
    fontWeight: '500'
  }
});
