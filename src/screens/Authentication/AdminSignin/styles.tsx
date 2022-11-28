import { StyleSheet } from 'react-native';

const leftMargin = '8%';

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
    width: '30%'
  },
  textContainer: {
    width: '70%',
    height: '6%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '25%'
  },
  inputContainer: {
    width: '82%',
    height: '20%',
    marginLeft: leftMargin
  },
  buttonContainer: {
    height: '9%',
    width: '83%',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: '20%'
  },
  headingText: {
    fontFamily: 'Quasimoda',
    color: '#49260C',
    fontSize: 31,
    fontWeight: '500',
    letterSpacing: 0.75
  },
  subText: {
    color: '#94613D',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.75
  },
  smallText: {
    color: '#94613D',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.75
  }
});
