import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    marginTop: '3%',
    width: '85%',
    height: 140,
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
  cardView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textView: {
    display: 'flex',
    flexDirection: 'column',
    width: 170,
    justifyContent: 'space-around',
<<<<<<< HEAD
    alignContent: 'flex-start',
=======
>>>>>>> main
  },
  businessNameText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'DMSans_700Bold',
  },
  infoText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'DMSans_500Medium',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 2,
    width: 112,
    height: 100,
  },
  declineButton: {
    borderWidth: 2,
    borderColor: '#D82D1F',
    width: 50,
    height: 50,
    backgroundColor: '#D82D1F',
    borderRadius: 10,
  },
  approveButton: {
    borderWidth: 2,
    borderColor: '#ABEE8B',
    width: 50,
    height: 50,
    backgroundColor: '#ABEE8B',
    borderRadius: 10,
  },
});
