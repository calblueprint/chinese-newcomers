import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  verificationContainer: {
    flex: 1,
    backgroundColor: '#ff',
    alignItems: 'flex-start',
    marginTop: '30%'
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
  signInButton: {
    backgroundColor: '#E13C3C',
    width: '80%',
    height: '6.5%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInText1: {
    color: 'black',
    fontSize: 30
  },
  signInText3: {
    color: 'white',
    fontSize: 25
  },
  formText: {
    color: 'white',
    fontSize: 25,
    padding: '5%'
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
