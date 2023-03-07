import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scale = windowWidth / 390;

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
    marginTop: '15%',
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    width: '22%',
  },
  textContainer: {
    width: '70%',
    height: '6%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '25%',
  },
  inputContainer: {
    marginTop: '8%',
    width: '82%',
    height: '17%',
    marginLeft: leftMargin,
  },
  buttonContainer: {
    height: '8%',
    width: '83%',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: '28%',
  },
  headingText: {
    fontFamily: 'DMSans_500Medium',
    color: '#49260C',
    fontSize: 31,
    fontWeight: '500',
    letterSpacing: 0.75,
  },
  subText: {
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.75,
  },
  smallText: {
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.75,
  },
});
