import React, { ReactElement, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { signOutUser } from '../firebase/auth';
import { User } from '../types/types';
import { AuthContext } from '../context/AuthContext';
import StyledButton from '../components/StyledButton/StyledButton';

function HomeScreen({ navigation }: any): ReactElement {
  // const { user } = useAuthentication();

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StyledButton
        text="Sign Out"
        style={styles.button}
        onPress={signOut}
        buttonStyle={{ width: '45%', height: '5%' }}
      />
    </View>
  );
}

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
