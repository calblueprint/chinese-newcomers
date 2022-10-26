import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import theme from '../styles/theme';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const DraftScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Job post drafting</Text>
      <TouchableOpacity style={styles.postButton}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      <Button title="Back" style={styles.button} onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 10
  },
  postButton: {
    ...theme.buttons.feedStandard,
    backgroundColor: theme.colors.cardBackground
  },
  buttonText: {
    ...theme.textVariants.body,
    alignSelf: 'center'
  }
});

export default DraftScreen;
