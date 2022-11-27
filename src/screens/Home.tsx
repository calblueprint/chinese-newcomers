import React, { ReactElement, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { signOutUser } from '../firebase/auth';
import { User } from '../types/types';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }: any): ReactElement => {
  // const { user } = useAuthentication();

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>

      <Button title="Sign Out" style={styles.button} onPress={signOut} />
      <Button title="Job Feed" style={styles.button} onPress={() => navigation.navigate('Feed')} />
      <Button
        title="Job post drafting"
        style={styles.button}
        onPress={() => navigation.navigate('Draft')}
      />
      <Button title="Sign In" style={styles.button} onPress={() => navigation.navigate('Signin')} />
      <Button
        title="Admin Register"
        style={styles.button}
        onPress={() => navigation.navigate('AdminRegister')}
      />
      <Button
        title="Phone Number Register"
        style={styles.button}
        onPress={() => navigation.navigate('PhoneNumberRegister')}
      />
      <Button
        title="Verification Code"
        style={styles.button}
        onPress={() => navigation.navigate('VerificationCode')}
      />
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
