import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import theme from "../styles/theme";

const auth = getAuth();

const DraftScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Job post drafting</Text>
      <TouchableOpacity style={styles.postButton}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      <Button
        title="Back"
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
  postButton: {
    ...theme.buttons.feedStandard,
    backgroundColor: theme.colors.cardBackground
  },
  buttonText: {
    ...theme.textVariants.body,
    alignSelf: "center"
  }
});

export default DraftScreen;
