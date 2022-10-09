import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import theme from "../styles/theme";

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
      {/* <Text>Job post drafting</Text> */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>CNSC Job Postings</Text>
      </View> */}

      <View style={styles.jobListing}>
        <View style={styles.title}>
          <Text style={styles.titleText}>New Job Listing</Text>
        </View>
        <View style = {styles.form}>
          <View style={styles.topEntries}>
            <View style={styles.formEntries}>
              <Text>employer: </Text>
              <TextInput
                style={styles.smallInput}
                // onChangeText={onChangeEmployer}
                placeholder="employer" 
              />
            </View>
            <View style={styles.formEntries}>
              <Text>hours: </Text>
              <TextInput
                style={styles.smallInput}
                // onChangeText={onChangeHours}
                placeholder="hours"
              />
            </View>
            <View style={styles.formEntries}>
                <Text>salary: </Text>
                <TextInput
                  style={styles.smallInput}
                  // onChangeText={onChangeSalary}
                  placeholder="salary"
                />
            </View>
          </View>

          <View style={styles.description}>
            <View style={styles.formEntries}> 
              <TextInput
                  style={styles.largeInput}
                  // onChangeText={onChangeDescription}
                  placeholder="description"
                  multiline={true} 
                  // set text input
                />
            </View>
          </View>

          <View style={styles.bottomEntry}>
            <View style={styles.formEntries}>
              <Text>contact: </Text>
              <TextInput
                style={styles.smallInput}
                // onChangeText={onChangeContact}
                placeholder="contact"
              />
            </View>
          </View>
        </View>
        <View style={styles.post}> 
          <TouchableOpacity style={styles.postButton} >
            <Text>post</Text>
          </TouchableOpacity>
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
    justifyContent: "center"
  },
  button: {
    marginTop: 10,
  },
  header:{
    backgroundColor: "#E13C3C",
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15%"
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
  },
  jobListing: {
    backgroundColor: "#C2B4B4",
    width: "80%",
    height: "70%",
    // marginBottom: "0%",
  }, 
  title: {
    backgroundColor: "#717171",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "8%"
  },
  titleText: {
    color: "#fff",
    fontSize: 28
  },
  form: {
    backgroundColor: "#fff",
    margin: "5%",
    height: "75%",
    justifyContent: "center",
    borderRadius: 5
  },
  formEntries: {
    flexDirection: "row",
    margin: "5%"
  },
  topEntries: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: "35%",
  },
  description: { 
    height: "50%" 
  },
  bottomEntry: {
    justifyContent: "space-around",
    height: "15%"
  },
  smallInput: {
    width: "100%"
  },
  largeInput: {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    overflow: "scroll"
  },
  post: {
    alignItems: "flex-end",
    marginEnd: "5%",
    marginBottom: "100%", // if removed, button is off on web
  },
  postButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 20,
    width: "20%",
  },
  buttonText: {
    ...theme.textVariants.body,
    alignSelf: "center"
  }
});

export default DraftScreen;
