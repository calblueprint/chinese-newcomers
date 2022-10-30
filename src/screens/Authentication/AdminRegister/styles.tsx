import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  logoContainer: {
    height: '100%',
    marginLeft: '10%',
    marginTop: '10%'
  },
  logo: {
    resizeMode: 'contain',
    height: '17%',
    width: '17%'
  },
  signInText1: {
    color: 'black',
    fontSize: 30
  },
  signInText2: {
    color: '#797979',
    fontSize: 15
  },
  signInText3: {
    color: 'white',
    fontSize: 25
  },
  nextButton: {
    backgroundColor: '#E13C3C',
    width: '40%',
    height: '5%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '40%'
  }
});
