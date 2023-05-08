import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: '80%',
    width: '100%',
    flex: 1,
    backgroundColor: '#EBEBEB',
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
  feedTitle: {
    color: '#49260C',
    fontSize: 28,
    fontFamily: 'DMSans_700Bold',
  },
  redSquare: {
    height: '50%',
    width: '20%',
    backgroundColor: 'red',
    borderRadius: 3,
  },
  footer: {
    height: '5%',
    width: '100%',
  },
  noJobsText: {
    display: 'flex',
    fontFamily: 'DMSans_500Medium',
    fontSize: 20,
    marginTop: 160,
  },
});
