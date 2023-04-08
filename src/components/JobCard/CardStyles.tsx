import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    marginTop: '3%',
    width: '85%',
    height: 100,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 7,
    borderColor: '#FFFFFFF',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
  },
  jobRef: {
    marginBottom: '3%',
    marginLeft: '10%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '15%',
  },
  jobName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '10%',
    height: '30%',
    marginBottom: '8%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: '70%',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    shadowColor: '#000',
    borderRadius: 20,
    borderColor: '#C59675',
    borderWidth: 2,
    shadowOpacity: 0.25,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'DMSans_700Bold',
  },
  modalHeader: {
    marginTop: '5%',
    width: '100%',
    height: '12%',
    alignItems: 'flex-start',
    marginLeft: '5%',
    justifyContent: 'center',
  },
  modalText: {
    marginTop: '1%',
    marginBottom: 15,
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    fontFamily: 'DMSans_500Medium',
  },
  modalFieldTitle: {
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    fontFamily: 'DMSans_500Medium',
  },
  modalInput: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#49260C',
    width: '100%',
    height: 40,
    marginBottom: '5%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  modalInfo: {
    width: '90%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '5%',
    marginRight: '5%',
  },
  jobRefText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  modalJobRefText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'DMSans_500Medium',
  },

  modalJobNameText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'DMSans_700Bold',
  },

  modalButtonText: {
    color: 'black',
    fontSize: 23,
    fontFamily: 'DMSans_700Medium',
    marginTop: '2%',
    marginBottom: '5%',
  },

  jobNameText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'DMSans_700Bold',
  },
  buttonContainer: {
    height: '18%',
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: '6%',
  },
  singleButtonContainer: {
    height: '18%',
    width: '80%',
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '6%',
  },
});
