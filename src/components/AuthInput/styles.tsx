import { StyleSheet } from 'react-native';

const input = {
  borderWidth: 2,
  borderRadius: 3,
  borderColor: '#49260C',
  width: '100%',
  height: '100%',
  padding: '3%',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    marginTop: '2%',
    marginBottom: '2%',
  },
  input,
  inputWithError: {
    ...input,
    borderColor: '#CC433C',
  },
});

export default styles;
