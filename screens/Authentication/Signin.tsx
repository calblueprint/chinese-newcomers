import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Pressable } from "react-native";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const logo = require('../../assets/favicon.png');

const SigninScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  return (

    <View style={styles.logocontainer} >
    <Image source={logo} style={styles.logo}/>
    <View style={styles.container}>
      
      <Text style={styles.text1}>Welcome to the Chinese Newcomers Service Center job portal!</Text>
      <Text style={styles.text2}>Let's get your account set up.</Text>
     
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.text3}> SIGN UP </Text>
      </Pressable>
      
      

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff",
    alignItems: "flex-start",
    justifyContent: "center",
    
  },
  logocontainer: {
    height:"100%",
    marginLeft: "10%",
    marginTop: "10%",
  },
  logo: {
    resizeMode: "contain",
    height: "17%",
    width: "17%",
  },
  button: {
    backgroundColor: "#E13C3C",
    width: "80%",
    height: "6.5%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    color: 'black',
    fontSize: 30, 
  },
  text2: {
    color: '#797979',
    fontSize: 15,   
  },
  text3: {
    color: 'white',
    fontSize: 25, 

  },
  
  
});

export default SigninScreen;
