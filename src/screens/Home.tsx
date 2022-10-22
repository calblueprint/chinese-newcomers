import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';

const HomeScreen = ({ navigation }: any): ReactElement => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>

      <Button title="Sign Out" style={styles.button} />
      <Button title="Job Feed" style={styles.button} onPress={() => navigation.navigate('Feed')} />
      <Button
        title="Job post drafting"
        style={styles.button}
        onPress={() => navigation.navigate('Draft')}
      />
      <Button title="Sign In" style={styles.button} onPress={() => navigation.navigate('Signin')} />
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

export default HomeScreen;
