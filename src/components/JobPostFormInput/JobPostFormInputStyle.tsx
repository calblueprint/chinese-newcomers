import { StyleSheet } from 'react-native';

const input = {
  width: '100%',
  marginTop: 4,
  paddingLeft: '3%',
  paddingRight: '3%',
};

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    marginTop: '2%',
    marginBottom: '2%',
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#49260C',
  },
  input,
  inputWithError: {
    ...input,
    borderColor: '#CC433C',
  },
});

