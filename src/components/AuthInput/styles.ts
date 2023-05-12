import { StyleSheet } from 'react-native';

const input = {
  borderWidth: 2,
  borderRadius: 3,
  borderColor: '#49260C',
  width: '100%',
  height: 40,
  paddingLeft: 5,
  // marginTop: 10,
  // marginBottom: 10,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // flex: 1,
    height: 40,
    // borderWidth: 2,
    borderColor: 'pink',
    marginTop: 10,
    marginBottom: 10,
  },
  input,
  inputWithError: {
    ...input,
    borderColor: '#CC433C',
  },
});

export default styles;
