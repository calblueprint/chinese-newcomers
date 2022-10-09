import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>

      <Button
        title="Sign Out"
        style={styles.button}
        onPress={() => signOut(auth)}
      />
      <Button
        title="Job Feed"
        style={styles.button}
        onPress={() => navigation.navigate("Feed")}
      />
      <Button
        title="Job post drafting"
        style={styles.button}
        onPress={() => navigation.navigate("Draft")}
      />
      <Button
        title="Sign In"
        style={styles.button}
        onPress={() => navigation.navigate("Signin")}
      />
      <Button
        title="Admin Sign In"
        style={styles.button}
        onPress={() => navigation.navigate("AdminSignin")}
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
});

export default HomeScreen;
