import { StyleSheet } from 'react-native';

const leftMargin = '9%';

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
    width: '75%',
    height: '25%',
    justifyContent: 'space-between',
    marginLeft: leftMargin,
    marginTop: '35%'
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '18%'
  },
  welcomeText: {
    color: '#49260C',
    fontSize: 31,
    fontWeight: '500',
    letterSpacing: 0.75
  },
  subText: {
    color: '#94613D',
    fontSize: 15,
    fontWeight: '400'
  },
  orText: {
    color: '#CC433C',
    fontSize: 18,
    fontWeight: '500'
  }
});
