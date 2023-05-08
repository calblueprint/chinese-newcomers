import { StyleSheet } from 'react-native';
import globalStyles from '../../../styles/theme';

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
    height: 100,
    display: 'flex',
    marginLeft: 35,
    justifyContent: 'space-between',
    marginTop: 60,
  },
  verificationContainer: {
    width: 320,
    height: 25,
    marginTop: 40,
    marginLeft: 35,
  },
  buttonContainer: {
    height: 40,
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  headingText: {
    ...globalStyles.textVariants.body1,
    fontSize: 24,
    color: '#49260C',
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  subText: {
    ...globalStyles.textVariants.body1,
    fontSize: 18,
    color: '#94613D',
    textAlign: 'left',
    lineHeight: 22,
  },
  backText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  backButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  svgContainer: {
    width: 22,
    height: 22,
    aspectRatio: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
