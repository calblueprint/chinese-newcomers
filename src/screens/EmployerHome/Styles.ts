import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  activeButton: {
    backgroundColor: '#CC433C',
    borderRadius: 25,
    height: 30,
    width: 100,
  },
  inactiveButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    height: 30,
    width: 100,
  },
  activeText: {
    color: '#FFFFFF',
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  inactiveText: {
    color: '#C4C4C4',
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  buttonContainer: {
    height: 70,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: '6%',
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  feedHeader: {
    height: '20%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  employerTitle: {
    color: '#49260C',
    fontSize: 24,
    fontFamily: 'DMSans_700Bold',
  }
});
