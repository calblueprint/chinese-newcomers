import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  activeButton: {
    backgroundColor: '#CC433C',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  inactiveButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },
  activeText: {
    color: '#FFFFFF',
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
  },
  inactiveText: {
    color: '#C4C4C4',
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
  },
  buttonContainer: {
    height: '21%',
    width: '83%',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: '6%',
  },
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  categoryText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: '7.5%',
    marginBottom: '1%',
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
