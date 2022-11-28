import { StyleSheet } from 'react-native';

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
    marginTop: '8%'
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    width: '30%'
  },
  textContainer: {
    width: '80%',
    height: '13%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '8%'
  },
  inputContainer: {
    width: '82%',
    height: '28%',
    marginTop: '2%',
    marginLeft: leftMargin
  },
  buttonContainer: {
    height: '5%',
    width: '82%',
    alignItems: 'flex-end',
    marginTop: '1%',
    marginLeft: leftMargin
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
