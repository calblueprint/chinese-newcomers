<<<<<<< HEAD
=======
import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import theme from "../styles/theme";
import { rounded } from "../styles/buttons";
import { useForm, Controller } from "react-hook-form";

const auth = getAuth();

const DraftScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();


  // where to use the useState variables
  // const [employer, onChangeEmployer] = React.useState();
  // const [hours, onChangeHours] = React.useState();
  // const [salary, onChangeSalary] = React.useState();
  // const [description, onChangeDescription] = React.useState();
  // const [contact, onChangeContact] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  }
  // console.log(errors)

  return (
    <View style={styles.container}>
      <View style={styles.jobListing}>
        <View style={styles.title}>
          <Text style={styles.titleText}>New Job Listing</Text>
        </View>

        {/* TESTING FORM START */}
        <View style={styles.form}>
          <View style={styles.topEntries}>
            <View style={styles.formEntries}>
              <Text>employer: </Text>
              <Controller 
                name="employer"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.smallInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.topEntries}>
            <View style={styles.formEntries}>
              <Text>hours: </Text>
              <Controller 
                name="hours"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.smallInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.topEntries}>
            <View style={styles.formEntries}>
              <Text>salary: </Text>
              <Controller 
                name="salary"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.smallInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.description}>
            <View style={styles.formEntries}>
              <Controller 
                name="description"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.largeInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline={true} 
                    placeholder="description"
                  />
                )}
              />
            </View>
          </View>
          <View style={styles.bottomEntry}>
            <View style={styles.formEntries}>
              <Text>contact: </Text>
              <Controller 
                name="contact"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.smallInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </View>
        </View>

        {/* TESTING FORM END */}


        {/* <View style = {styles.form}>
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
        </View> */}

        <Modal
          visible = {modalVisible}
          animationType="slide"
          transparent={true}
        >
          <View>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>CONFIRMATION</Text>
                <Text>Do you want to post this job?</Text>

                <View style={styles.modalButtons}>

                  <View>
                    <TouchableOpacity 
                      style={styles.modalButton}
                      onPress={handleSubmit(onSubmit)}
                    >
                      <Text>yes</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.modalButton}>
                      <Text>save</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={()=>setModalVisible(!modalVisible)}
                    >
                      <Text>no</Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.post}> 
          <TouchableOpacity 
            style={styles.postButton}
            onPress={()=>setModalVisible(!modalVisible)}
          >
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
    height: "25%",
  },
  description: { 
    height: "40%" 
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
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
    width: "80%",
    backgroundColor: "#C2B4B4",
    height: "20%",
    borderRadius: 20
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  modalButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 5
  },
  modalButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 20,
    width: "150%",
  },
  buttonText: {
    ...theme.textVariants.body,
    alignSelf: "center"
  }
});

export default DraftScreen;
>>>>>>> 42e418e (fixed description text going off screen)
