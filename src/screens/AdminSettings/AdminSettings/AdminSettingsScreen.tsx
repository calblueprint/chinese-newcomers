import React, { ReactElement, useContext } from 'react';
import { View } from 'react-native';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signUserOut, updateLanguage } from '../../../firebase/auth';
import { AdminSettingsStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function AdminSettingsScreen({
  navigation,
}: AdminSettingsStackScreenProps<'AdminSettingsScreen'>): ReactElement {
  const { dispatch, langUpdate, userObject } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {userObject?.access === 'admin' && (
        //   <StyledButton
        //   text="Give Access"
        //   onPress={() => navigation.navigate('AccessScreen')}
        //   buttonStyle={{ width: '45%', height: '5%' }}
        //   textStyle={{}}
        // />
        <>
          <StyledButton
            text="Add Admin Account"
            onPress={() => navigation.navigate('AccessScreen')}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
          <StyledButton
            text="Approve Employers"
            onPress={() => navigation.navigate('EmployerApprovalScreen')}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </>
      )}
      <StyledButton
        text="English"
        onPress={() =>
          updateLanguage(
            dispatch,
            langUpdate,
            { language: 'english' },
            userObject?.id as string,
            userObject?.access as string,
          )
        }
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
      <StyledButton
        text="Chinese"
        onPress={() =>
          updateLanguage(
            dispatch,
            langUpdate,
            { language: 'chinese' },
            userObject?.id as string,
            userObject?.access as string,
          )
        }
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
      <StyledButton
        text="Sign Out"
        onPress={() => signUserOut(dispatch)}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

export default AdminSettingsScreen;
