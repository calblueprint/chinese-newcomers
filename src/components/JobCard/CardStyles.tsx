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
    borderColor: '#C59675',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    elevation: 5
  },
  jobRef: {
    marginBottom: '3%',
    marginLeft: '6%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '15%',
  },
  jobName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: '6%',
    height: '30%',
    marginBottom: '10%',
    marginRight: '10%'
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
    marginLeft: '5%',
    justifyContent: 'center',
  },
  modalText: {
    marginTop: '1%',
    marginBottom: 15,
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    marginLeft: '5%',
    fontFamily: 'DMSans_500Medium',
  },
  modalInfo: {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
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
    display: 'flex',
    flexDirection: 'row',
    marginRight: 13
  },
  jobNameText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold'
  },
  heart: {
    width: 40,
    height: 40,
    marginRight: 0
  },
  jobNameModal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  boldModalText: {
    fontWeight: 'bold'
    fontFamily: "DMSans_700Bold"
  },

  modalButtonText: {
    color: 'black',
    fontSize: 23,
    fontFamily: "DMSans_700Medium",
    marginTop: '2%',
    marginBottom: '5%'
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
});
