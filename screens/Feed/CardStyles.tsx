import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cardContainer: {
        marginTop: '3%',
        width: "80%",
        height: '30%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#C2B4B4',
    
      },
      cardHeader: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'grey',
        height: '15%',
      },
      cardFooter: {
        alignItems: "flex-end",
    
      },
      description: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
      },
      moreInfoButton: {
        width: '30%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
        marginRight: '5%',
        borderRadius: 10,
      },

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        height: '40%',
        width: "80%",
        backgroundColor: "#C2B4B4",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        padding: 10,
        elevation: 2
      },

      hideButton: {
        alignContent: 'center',
        backgroundColor: "red",
        height: '8%',
        width: '30%',
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "left",
        color: 'white',
        fontSize: 18,
      },
      modalHeader: {
        width: '100%',
        height: '12%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'grey',
      },

      modalInfo: {
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        padding: '5%',

      },
      titleText: {
        color: 'white',
        fontSize: 20,
      },
});