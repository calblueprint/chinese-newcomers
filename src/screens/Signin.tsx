import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const SigninScreen = ({ navigation }: any): ReactElement => {
  return (
    <View style={styles.container}>
      <Text>Sign in</Text>
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
  }
});

export default SigninScreen;
