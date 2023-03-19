import React, { ReactElement, useContext } from 'react';
import { View } from 'react-native';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signUserOut } from '../../../firebase/auth';
import styles from './styles';

function SignoutScreen(): ReactElement {
  const { dispatch } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StyledButton
        text="Sign Out"
        onPress={() => signUserOut(dispatch)}
        buttonStyle={{ width: '45%', height: '5%' }}
        textStyle={{}}
      />
    </View>
  );
}

export default SignoutScreen;
