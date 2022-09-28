import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { color } from "react-native-elements/dist/helpers";
// import { useForm } from "react-hook-form";

const auth = getAuth();

const DraftScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  const [employer, onChangeEmployer] = React.useState();
  const [hours, onChangeHours] = React.useState();
  const [salary, onChangeSalary] = React.useState();
  const [description, onChangeDescription] = React.useState();
  const [contact, onChangeContact] = React.useState();

  return (
    <View style={styles.container}>
      <Text>Job post drafting</Text>
      <View style={styles.jobListing}>
        <View style={styles.title}>
          <Text style={styles.title}>New Job Listing</Text>
        </View>
        <View style = {styles.form}>
          <View style={styles.employer}>
            <Text>employer: </Text>
            <TextInput
              style={styles.employer}
              onChangeText={onChangeEmployer}
              placeholder="employer" // ?
            />
          </View>
          <View style={styles.hours}>
            <Text>hours: </Text>
            <TextInput
              style={styles.hours}
              onChangeText={onChangeHours}
              placeholder="hours"
            />
          </View>
          <View style={styles.description}>
            <Text>description: </Text>
            <TextInput
              style={styles.description}
              onChangeText={onChangeDescription}
              placeholder="description"
            />
          </View>
          <View style={styles.contact}>
            <Text>contact: </Text>
            <TextInput
              style={styles.contact}
              onChangeText={onChangeContact}
              placeholder="contact"
            />
          </View>

        </View>
        <View> 
          {/* add onPress inside pressable, need to use react hook form inside onPress */}
          <Pressable style={styles.postButton} >
            <Text>post</Text>
          </Pressable>
        </View>
      </View>
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
  jobListing: {
    backgroundColor: "#C2B4B4",
    width: "80%",
    height: "60%",
  }, 
  title: {
    backgroundColor: "#717171",
    color: "#fff",
    alignItems: "center"
  },
  form: {
    backgroundColor: "#fff",
    margin: "5%"
    
  },
  employer: {

  },
  hours: {

  },
  description: {

  },
  contact: {

  },
  postButton: {
    backgroundColor: "#fff",
    alignItems: "flex-end"
  }
});

export default DraftScreen;
