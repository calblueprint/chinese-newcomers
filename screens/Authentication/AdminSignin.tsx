import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Pressable } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import styles from "./styles";
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler,} from "react-hook-form";


const auth = getAuth();

const logo = require('../../assets/favicon.png');


const AdminSigninScreen = ({ navigation }: any) => {
    type FormValues = {
        email: string;
        password: string;
      };
    const {...register} = useForm();



  return (

    <View style={styles.logocontainer} >
    <Image source={logo} style={styles.logo}/>

    <View style= {styles.container}>
        <Text style= {styles.signintext1}> Great! Now enter your email and create a password. </Text>
        <FormProvider {...register}>
        <Form
          name="email"
          rules={{ required: "Email is required!" }}
          label="Email"
          placeholder="email@email.com"
          keyboardType="email-address"
        />
        <Form
          name="password"
          rules={{ required: "Password is required!" }}
          label="Password"
          placeholder="password"
          keyboardType="email-address"
          secureTextEntry={true}
        />
      </FormProvider>

    </View>
    </View>
  );
};


export default AdminSigninScreen;

