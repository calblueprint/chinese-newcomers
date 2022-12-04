import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const scale = windowWidth / 390;
const leftMargin = '7%';

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
    marginTop: '15%'
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    width: '22%'
  },
  textContainer: {
    width: '92%',
    height: '17%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '8%'
  },
  phonenumberContainer: {
    width: '83%',
    marginLeft: leftMargin,
    marginTop: '6%'
  },
  buttonContainer: {
    height: '18%',
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: '6%'
    // color: 'black',
    // borderWidth: 2
  },
  headingText: {
    fontFamily: 'DMSans_500Medium',
    color: '#49260C',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(31 * scale)),
    fontWeight: '500',
    letterSpacing: 0.75
  },
  subText: {
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(20 * scale)),
    fontWeight: '500'
  }
});
