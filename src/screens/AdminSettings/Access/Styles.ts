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
    flexDirection: 'column',
  },
  textContainer: {
    width: '92%',
    height: '17%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '8%',
  },
  phonenumberContainer: {
    width: '83%',
    marginLeft: leftMargin,
    marginTop: '4%',
  },
  buttonContainer: {
    height: '18%',
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: '6%',
  },
  headingText: {
    fontFamily: 'DMSans_500Medium',
    color: '#49260C',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(31 * scale)),
    fontWeight: '500',
    letterSpacing: 0.75,
  },
  subText: {
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(20 * scale)),
    fontWeight: '500',
  },
  subTextRadio: {
    marginTop: '8%',
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: Math.round(PixelRatio.roundToNearestPixel(20 * scale)),
    fontWeight: '500',
    textAlign: 'center',
  },
  unselectedRadioButton: {
    width: '45%',
    height: '100%',
    color: '#CC433C',
    backgroundColor: '#FFFFFF',
    borderColor: '#CC433C',
    fontSize: 16,
  },
  selectedRadioButton: {
    width: '45%',
    height: '100%',
  },
  selectedTextStyle: {
    fontSize: 16, color: '#CC433C'
  },
  formContainer: {
    justifyContent: 'center'
  }
});
