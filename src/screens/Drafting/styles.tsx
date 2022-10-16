import { StyleSheet } from 'react-native';
// import theme from '../../styles/theme';

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
  jobListing: {
    backgroundColor: '#C2B4B4',
    width: '80%',
    height: '70%'
  },
  title: {
    backgroundColor: '#717171',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '8%'
  },
  titleText: {
    color: '#fff',
    fontSize: 28
  },
  form: {
    backgroundColor: '#fff',
    margin: '5%',
    height: '75%',
    justifyContent: 'center',
    borderRadius: 5
  },
  formEntries: {
    flexDirection: 'row',
    margin: '5%'
  },
  topEntries: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '40%'
  },
  description: {
    height: '45%'
  },
  bottomEntry: {
    justifyContent: 'space-around',
    height: '15%'
  },
  smallInput: {
    width: '100%'
  },
  largeInput: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    overflow: 'scroll'
  },
  post: {
    alignItems: 'flex-end',
    marginEnd: '5%',
    marginBottom: '100%'
  },
  postButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 20,
    width: '20%'
  },
  // TODO: blur background
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#C2B4B4',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButtons: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5
  },
  modalButton: {
    borderRadius: 15,
    padding: 5,
    backgroundColor: 'white'
  }
});
