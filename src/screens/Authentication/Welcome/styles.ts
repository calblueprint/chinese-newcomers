import { Dimensions, StyleSheet } from 'react-native';
import globalStyles from '../../../styles/theme';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 130,
  },
  logo: {
    resizeMode: 'contain',
    height: 130,
    width: 130,
  },
  textContainer: {
    width: 340,
    height: 170,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 90,
    justifyContent: 'space-around',
    height: 200,
  },
  welcomeText: {
    ...globalStyles.textVariants.h1,
    color: '#CC433C',
    fontSize: 45,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subText: {
    ...globalStyles.textVariants.h2,
    color: '#49260C',
    fontSize: 25,
    textAlign: 'center',
    lineHeight: 35,
  },
  welcomeButtons: {
    backgroundColor: '#CC433C',
    width: 300,
    height: 59,
    borderRadius: 7,
    borderColor: '#D82D1F',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeButtonText: {
    ...globalStyles.textVariants.h3,
    color: globalStyles.colors.background,
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: 480,
    height: 350,
    width: windowWidth,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    borderRadius: 20,
    borderColor: globalStyles.colors.background,
    borderWidth: 2,
    shadowOpacity: 0.95,
    elevation: 50,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 200,
  },
  modalHeader: {
    marginTop: 50,
    width: windowWidth,
    alignItems: 'center',
  },
  modalChooseLang: {
    ...globalStyles.textVariants.h3,
    fontSize: 28,
  },
  modalButtonsContainer: {
    height: 170,
    width: 280,
    alignItems: 'center',
    marginTop: 32,
    justifyContent: 'space-around',
  },
  modalButtons: {
    backgroundColor: '#CC433C',
    width: 230,
    height: 57,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonsText: {
    ...globalStyles.textVariants.h3,
    color: globalStyles.colors.background,
  },
});
