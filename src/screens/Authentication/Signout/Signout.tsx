import React, { ReactElement, useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import StyledButton from '../../../components/StyledButton/StyledButton';
import styles from './styles';

function HomeScreen({ navigation }: any): ReactElement {

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StyledButton
        text="Sign Out"
        onPress={signOut}
        buttonStyle={{ width: '45%', height: '5%' }}
        textStyle = {{}}
        activeOpacity = {{}}
      />
    </View>
  );
}


export default HomeScreen;