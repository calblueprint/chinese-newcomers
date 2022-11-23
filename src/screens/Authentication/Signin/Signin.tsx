import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../styles';
import StyledButton from '../../../components/StyledButton/StyledButton';

const SigninScreen = ({ navigation }: any): ReactElement => {
  return (
    <View style={styles.container}>
      <Text>What are you signing in as? </Text>
      <StyledButton
        text="admin"
        onPress={() => navigation.navigate('AdminSignin')}
        buttonStyle={{}}
        textStyle={{}}
      />
      <StyledButton
        text="job seeker"
        onPress={() => navigation.navigate('PhoneNumberRegister')}
        buttonStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CC433C' }}
        textStyle={{ color: '#CC433C' }}
      />
    </View>
  );
};

export default SigninScreen;
