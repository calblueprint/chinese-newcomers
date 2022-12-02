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
    width: '22%'
  },
  textContainer: {
    width: '70%',
    height: '11%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '30%'
  },
  buttonContainer: {
    height: '21%',
    width: '83%',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: '6%'
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
