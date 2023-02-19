import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableHighlight } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import styles from './PhoneNumberInputStyles';

function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const handleSubmit = () => {
    const isValid = phoneInput.current?.isValidNumber(phoneNumber);
    if (isValid) {
      console.log('SUBMITTED! ', phoneNumber);
    } else {
      console.log('INVALID NUMBER.');
    }
  };
  return (
    <SafeAreaView>
      <PhoneInput
        style={styles.phoneInput}
        initialValue={phoneNumber}
        initialCountry="us"
        onChangeText={(text) => {
          setPhoneNumber(text);
        }}
        withShadow
        autoFocus
      />
      <TouchableHighlight onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

export default PhoneNumberInput;
