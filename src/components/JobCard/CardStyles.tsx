import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  cardContainer: {
    marginTop: '3%',
    width: '80%',
    height: '15%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 7,
    borderColor: '#C59675',
    borderWidth: 2
  },
  jobRef: {
    marginTop: '5%',
    marginLeft: '10%',
    alignItems: 'left',
    justifyContent: 'center',
    height: '15%'
  },
  cardFooter: {
    alignItems: 'flex-end'
  },
  jobName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    marginLeft: '10%',
    height: '30%'
  },
  moreInfoButton: {
    width: '30%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
    marginRight: '5%',
    borderRadius: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    marginTop: '70%',
    height: '66%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    shadowColor: '#000',
    borderRadius: 20,
    borderColor: '#C59675',
    borderWidth: 2,
    shadowOpacity: 0.25,
    elevation: 5
  },
  button: {
    padding: 10,
    elevation: 2
  },
  hideButton: {
    alignContent: 'center',
    backgroundColor: 'red',
    height: '5%',
    width: '30%'
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalHeader: {
    marginTop: '5%',
    width: '100%',
    height: '12%',
    alignItems: 'left',
    marginLeft: '5%',
    justifyContent: 'center'
  },
  modalText: {
    marginTop: '5%',
    marginBottom: 15,
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    marginLeft: '5%'
  },
  modalInfo: {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column'
  },
  jobRefText: {
    color: 'black',
    fontSize: 14
  },
  modalJobRefText: {
    color: 'black',
    fontSize: 20
  },

  modalJobNameText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold'
  },

  jobNameText: {
    color: 'black',
    fontsize: 30,
    fontWeight: 'bold'
  }
});
