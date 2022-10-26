import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column'
  },

  feedHeader: {
    height: '8%',
    width: '100%',
    backgroundColor: 'red',
    textColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center'
  },
  feedTitle: {
    color: 'white',
    fontSize: 25
  }
});
