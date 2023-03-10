import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowHeight);
const scale = windowWidth / 390;
const heightscale = windowHeight / 844;
const leftMargin = '8%';

export default StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  logoContainer: {
    width: '100%',
    height: '13%',
    justifyContent: 'flex-start',
    marginLeft: leftMargin,
    marginTop: '8%',
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    width: '22%',
  },
  textContainer: {
    width: '70%',
    height: '12%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '30%',
  },
  buttonContainer: {
    height: '21%',
    width: '83%',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: '6%',
  },
  backButtonContainer: {
    height: '21%',
    width: '83%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '35%',
  },
  headingText: {
    fontFamily: 'DMSans_500Medium',
    color: '#49260C',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(30 * scale)),
    fontWeight: '500',
    letterSpacing: 0.55,
  },
  subText: {
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(20 * scale)),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
