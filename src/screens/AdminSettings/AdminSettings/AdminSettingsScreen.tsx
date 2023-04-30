import React, { ReactElement, useContext } from 'react';
import { View } from 'react-native';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signUserOut } from '../../../firebase/auth';
import { AdminSettingsStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function AdminSettingsScreen({navigation}: AdminSettingsStackScreenProps<'AdminSettingsScreen'>): ReactElement {
  const { dispatch } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StyledButton
        text="Give Access"
        onPress={() => navigation.navigate('AccessScreen')}
        buttonStyle={{ width: '45%', height: '5%' }}
        textStyle={{}}
      />
      <StyledButton
        text="Sign Out"
        onPress={() => signUserOut(dispatch)}
        buttonStyle={{ width: '45%', height: '5%' }}
        textStyle={{}}
      />
      <StyledButton
        text="Approve Employers"
        onPress={() => navigation.navigate('EmployerApprovalScreen')}
        buttonStyle={{ width: '45%', height: '5%' }}
        textStyle={{}}
      />
    </View>
  );
}

export default AdminSettingsScreen;
