import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },

  feedHeader: {
    height: '20%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  feedTitle: {
    color: '#49260C',
    fontSize: 28
  },
  footer: {
    height: '5%',
    width: '100%'
  }
});
