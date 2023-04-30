import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
  top: {
    marginTop: 80,
  },
  refId: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'DMSans_500Medium',
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'DMSans_700Bold',
  },
  form: {
    width: '100%',
    flexDirection: 'column',
  },
  formContainer: {
    flex: 1,
    width: '82%',
    alignSelf: 'center',
  },
  formTop: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 25,
  },
  formText: {
    fontSize: 18,
    marginLeft: 12,
    marginTop: 3,
    fontFamily: 'DMSans_500Medium',
  },
  toggleText: {
    fontSize: 16, 
    fontFamily: 'DMSans', 
    color: '#94613D', 
    textAlign:'center'
  },
  bottomButtons: {
    flexDirection: 'row',
    alignContent: 'space-around',
    // height: 80,
    marginBottom: 30,
  },
  buttons: {
    width: 150,
    height: 45,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'DMSans_500Medium',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 35,
    paddingHorizontal: 39,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 200,
    elevation: 5,
  },
  modalText: {
    marginBottom: 30,
    ...theme.textVariants.h3,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 22, 
  },
  modalX: {
    display: 'flex',
    position: 'absolute',
    top: '5%',
    right: '5%',
  },
  bottomText: {
    fontSize: 14,
    color: '#D82D1F',
    fontFamily: 'DMSans_500Medium',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  errorText: {
    color:'#D82D1F',
    fontSize: 13,
  }
});
