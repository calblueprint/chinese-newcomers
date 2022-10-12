import React from 'react';
import { StyleSheet, TextInput, Text, View, Image, Pressable } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import styles from './styles';

const auth = getAuth();

const PhoneNumberScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  return <View> hey </View>;
};

export default PhoneNumberScreen;
