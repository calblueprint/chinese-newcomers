import { StyleSheet } from 'react-native';
import { withBadge } from 'react-native-elements';

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
  redSquare: {
    height: '50%',
    width: '20%',
    backgroundColor: 'red',
    borderRadius: 3
  },
  footer: {
<<<<<<< HEAD
    width: '100%',
    height: '8%'
=======
    height: '5%',
    width: '100%'
>>>>>>> mia-jobcard-update
  }
});
