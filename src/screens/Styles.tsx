import { StyleSheet } from "react-native";

export default StyleSheet.create({
        container: {
          height: '100%',
          width: '100%',
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          flexDirection: 'column'
        },
      
        feedHeader: {
          height: '8%',
          width: '100%',
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        },

        createPosting: {
          width: '100%',
          height: '30%',
          alignContent: 'center',
        },
        feedTitle: {
          color: 'white',
          fontSize: 25,
        }

});