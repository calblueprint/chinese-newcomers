import { StyleSheet } from 'react-native';

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
    font: 'Quasimoda',
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
  }
});
