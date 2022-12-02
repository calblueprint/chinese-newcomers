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
    width: '22%'
  },
  textContainer: {
    width: '60%',
    height: '15%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '11%'
  },
  verificationContainer: {
    width: '83%',
    height: '6%',
    marginTop: '6%',
    marginLeft: leftMargin
  },
  buttonContainer: {
    height: '5%',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginTop: '8%'
  },
  headingText: {
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
  }
});
