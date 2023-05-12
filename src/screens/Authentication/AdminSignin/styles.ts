import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  textContainer: {
    width: 300,
    height: 40,
    justifyContent: 'space-between',
    marginLeft: 35,
    marginTop: 100,
  },
  inputContainer: {
    marginTop: 30,
    width: 310,
    height: 180,
    marginLeft: 35,
  },
  buttonContainer: {
    height: 120,
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
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
  backText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  svgContainer: {
    width: 22,
    height: 22,
    aspectRatio: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
