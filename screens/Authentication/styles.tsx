import { StyleSheet } from "react-native";


export default StyleSheet.create({
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
    signinbutton: {
      backgroundColor: "#E13C3C",
      width: "80%",
      height: "6.5%",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    signintext1: {
      color: 'black',
      fontSize: 30, 
    },
    signintext2: {
      color: '#797979',
      fontSize: 15,   
    },
    signintext3: {
      color: 'white',
      fontSize: 25, 
  
    },

});