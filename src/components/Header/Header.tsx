import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Logo from '../../assets/cnsc-logo.png';
import { AuthContext } from '../../context/AuthContext';
import { signUserOut } from '../../firebase/auth';
import SignoutIcon from '../../assets/sign-out.svg';
import styles from './styles';

interface HeaderProps {
  title: string
}

export default function Header({title}: HeaderProps) {
  const { dispatch } = useContext(AuthContext);

  return (
  <View style={styles.container}>
    <Image source={Logo} style={{ width: 42, height: 47, marginRight: '5%', marginLeft: '5%', }} />
    <Text style={styles.feedTitle}>{title}</Text>
    <Pressable 
      style={{ marginLeft: 'auto' }} 
      onPress={() => signUserOut(dispatch)}>
      <SignoutIcon/>
    </Pressable>

    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 10,
      }}
    />
   </View>
  );
}