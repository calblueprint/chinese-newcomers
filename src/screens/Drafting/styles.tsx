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
    marginTop: '5%',
    marginBottom: '8%'
  },
  refId: {
    fontSize: 14,
    fontWeight: '500'
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  form: {
    width: '82%',
    flexDirection: 'column',
    marginBottom: '10%'
  },
  formTop: {
    flexDirection: 'row',
    marginBottom: 5
  },
  formText: {
    fontSize: 18,
    marginLeft: 12
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
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold'
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
