import React from 'react';
import { StyleSheet, TextInput, Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import styles from './styles';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

const auth = getAuth();
const logo = require('../../assets/favicon.png');

const VerificationScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const { ...verificationcode } = useForm();

  return (
    <View style={styles.logocontainer}>
      <Image source={logo} style={styles.logo} />
      <FormProvider {...verificationcode}>
        <View style={styles.container}>
          <Text style={styles.signintext1}>Enter the six-digit code: </Text>
          <TextInput style={styles.input} placeholder=" code" />
          <Pressable
            style={styles.nextbutton}
            // onPress={register.handleSubmit(onSubmit)}
          >
            <Text style={styles.signintext3}> Next </Text>
          </Pressable>
        </View>
      </FormProvider>
    </View>
  );
};

export default VerificationScreen;
