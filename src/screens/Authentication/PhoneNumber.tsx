/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { StyleSheet, TextInput, Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import styles from './styles';
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import PhoneInput from 'react-native-phone-number-input';

const auth = getAuth();
const logo = require('../../assets/favicon.png');

const PhoneNumberScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const { ...phonenumber } = useForm();

  return (
    <View style={styles.logocontainer}>
      <Image source={logo} style={styles.logo} />
      <FormProvider {...phonenumber}>
        <View style={styles.container}>
          <Text style={styles.signintext1}>Enter your phone number: </Text>
          <Text style={styles.signintext2}>
            You'll receive a six-digit verification code to enter.{' '}
          </Text>
          <TextInput style={styles.input} placeholder=" phone number" />
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

export default PhoneNumberScreen;
