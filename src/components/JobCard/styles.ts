import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    marginTop: 14,
    width: 330,
    height: 100,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 7,
    borderColor: '#C59675',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
  },
  jobRef: {
    marginTop: 10,
    marginLeft: 18,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 18,
  },
  jobRefText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  jobName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 18,
    height: 38,
    width: 285,
    marginBottom: 22,
  },
  jobNameText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'DMSans_700Bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  scrollView: {
    marginTop: 155,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    borderRadius: 20,
    shadowOpacity: 0.25,
    elevation: 5,
    borderColor: '#C59675',
    borderWidth: 2,
  },
  modalView: {
    alignItems: 'flex-start',
    borderRadius: 20,
  },
  modalInfo: {
    flex: 1,
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30,
    marginLeft: 20,
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
  modalText: {
    marginTop: 4,
    marginBottom: 15,
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    fontFamily: 'DMSans_500Medium',
    fontWeight: '700',
  },
  modalFieldName: {
    fontSize: 18,
    fontFamily: 'DMSans_700Bold',
  },
  modalHeader: {
    marginTop: 12,
    width: 340,
    height: 110,
    alignItems: 'flex-start',
    marginLeft: 14,
    justifyContent: 'center',
  },
  exitButton: {
    width: 28,
    height: 36,
    marginBottom: 24,
  },
  modalButtonText: {
    color: 'black',
    fontSize: 34,
    fontFamily: 'DMSans_700Medium',
  },
  modalJobRefText: {
    color: 'black',
    fontSize: 20,
    marginLeft: 6,
    fontFamily: 'DMSans_500Medium',
  },

  modalJobNameText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 6,
    fontFamily: 'DMSans_700Bold',
  },
  buttonContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: '6%',
    marginBottom: 50,
  },
  singleButtonContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
  },
});
