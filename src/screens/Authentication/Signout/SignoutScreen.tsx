import React, { ReactElement, useContext } from 'react';
import { View } from 'react-native';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { AuthContext } from '../../../context/AuthContext';
import { signUserOut, updateLanguage } from '../../../firebase/auth';
import { SignoutStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function SignoutScreen({
  navigation,
}: SignoutStackScreenProps<'SignoutScreen'>): ReactElement {
  const { dispatch, langUpdate } = useContext(AuthContext);

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
        text="English"
        onPress={() =>
          updateLanguage(dispatch, langUpdate, { language: 'english' })
        }
        buttonStyle={{ width: '45%', height: '5%' }}
        textStyle={{}}
      />
      <StyledButton
        text="Chinese"
        onPress={() =>
          updateLanguage(dispatch, langUpdate, { language: 'chinese' })
        }
        buttonStyle={{ width: '45%', height: '5%' }}
        textStyle={{}}
      />
    </View>
  );
}

export default SignoutScreen;
