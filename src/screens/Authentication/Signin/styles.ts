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
    width: 340,
    height: 100,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginTop: 60,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 65,
    justifyContent: 'space-around',
    height: 300,
  },
  headerText: {
    ...globalStyles.textVariants.h2,
    color: '#49260C',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subText: {
    ...globalStyles.textVariants.h3,
    fontSize: 18,
    color: '#94613D',
    textAlign: 'center',
    lineHeight: 35,
  },
  welcomeButtons: {
    backgroundColor: '#CC433C',
    width: 307,
    height: 59,
    borderRadius: 7,
    borderColor: '#D82D1F',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    height: '100%',
    width: '100%',
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
