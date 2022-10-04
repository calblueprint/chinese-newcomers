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

});