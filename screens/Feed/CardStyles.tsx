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
        borderRadius: 10,
        marginBottom: '5%',
        marginRight: '5%'
      },


      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }

});