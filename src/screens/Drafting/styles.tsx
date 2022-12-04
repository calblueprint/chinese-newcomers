import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 10
  },
  top: {
    marginTop: '5%'
  },
  refId: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'DMSans_500Medium'
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'DMSans_700Bold'
  },
  formContainer: {
    flex: 1,
    width: '82%',
    alignSelf: 'center'
  },
  form: {
    width: '100%',
    flexDirection: 'column'
  },
  formTop: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 25
  },
  formText: {
    fontSize: 18,
    marginLeft: 12,
    fontFamily: 'DMSans_500Medium'
  },
  bottomButtons: {
    flexDirection: 'row',
    alignContent: 'space-around',
    marginBottom: '10%'
  },
  buttons: {
    width: '45%',
    height: '22%',
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%'
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'DMSans_500Medium'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modal: {
    width: '80%',
    height: '50%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingHorizontal: 39,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.95,
    shadowRadius: 200,
    elevation: 5
  },
  modalText: {
    marginBottom: 20,
    ...theme.textVariants.h3
  },
  modalX: {
    display: 'flex',
    position: 'absolute',
    top: '5%',
    right: '5%'
  }
});
