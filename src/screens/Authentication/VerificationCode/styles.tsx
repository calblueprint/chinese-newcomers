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
    marginTop: '15%'
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    width: '22%'
  },
  textContainer: {
    width: '60%',
    height: '17%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '8%'
  },
  verificationContainer: {
    width: '84%',
    height: '6%',
    marginTop: '4%',
    marginLeft: leftMargin
  },
  buttonContainer: {
    height: '5%',
    width: '83%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
