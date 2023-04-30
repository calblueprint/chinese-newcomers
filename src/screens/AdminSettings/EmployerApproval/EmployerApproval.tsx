import React, { ReactElement, useContext } from 'react';
import { Text, View } from 'react-native';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signUserOut } from '../../../firebase/auth';
import { AdminSettingsStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function EmployerApprovalScreen({navigation}: AdminSettingsStackScreenProps<'EmployerApprovalScreen'>): ReactElement {
  const { dispatch } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>hello!</Text>
    </View>
  );
}

export default EmployerApprovalScreen;
