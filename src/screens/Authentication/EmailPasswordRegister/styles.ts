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
    width: 310,
    height: 65,
    justifyContent: 'space-around',
    marginLeft: 35,
    marginTop: 20,
  },
  inputContainer: {
    width: 310,
    marginTop: 15,
    marginLeft: 35,
    justifyContent: 'flex-start',
    paddingBottom: 15,
  },
  buttonContainer: {
    height: 40,
    width: 310,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headingText: {
    fontFamily: 'DMSans_500Medium',
    color: '#49260C',
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  subText: {
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  smallText: {
    fontFamily: 'DMSans_500Medium',
    color: '#94613D',
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  errorText: {
    marginBottom: 5,
  },
  backText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 20,
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
