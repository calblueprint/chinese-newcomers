import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import theme from '../styles/theme';
import { rounded } from '../styles/buttons';
import { useForm, FormProvider, SubmitErrorHandler } from 'react-hook-form';

const auth = getAuth();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const DraftScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  const [modalVisible, setModalVisible] = React.useState(false);

  interface FormValues {
    employer: string;
    hours: string;
    salary: string;
    description: string;
    contact: string;
  }

  const { ...methods } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <View style={styles.container}>
      <View style={styles.jobListing}>
        <View style={styles.title}>
          <Text style={styles.titleText}>New Job Listing</Text>
        </View>

        <View style={styles.form}>
          <FormProvider {...methods}>
            <View style={styles.topEntries}>
              <View style={styles.formEntries}>
                <Text>employer: </Text>
                <TextInput style={styles.smallInput} placeholder="employer" />
              </View>
              <View style={styles.formEntries}>
                <Text>hours: </Text>
                <TextInput style={styles.smallInput} placeholder="hours" />
              </View>
              <View style={styles.formEntries}>
                <Text>salary: </Text>
                <TextInput style={styles.smallInput} placeholder="salary" />
              </View>
            </View>
            <View style={styles.description}>
              <View style={styles.formEntries}>
                <TextInput style={styles.largeInput} placeholder="description" />
              </View>
            </View>
            <View style={styles.bottomEntry}>
              <View style={styles.formEntries}>
                <Text>contact: </Text>
                <TextInput style={styles.smallInput} placeholder="contact" />
              </View>
            </View>
          </FormProvider>
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>CONFIRMATION</Text>
                <Text>Do you want to post this job?</Text>

                <View style={styles.modalButtons}>
                  <View>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={methods.handleSubmit(onSubmit, onError)}>
                      <Text>yes</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text>save</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setModalVisible(!modalVisible)}>
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
            onPress={() => setModalVisible(!modalVisible)}>
            <Text>post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button title="Back" style={styles.button} onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 10
  },
  header: {
    backgroundColor: '#E13C3C',
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15%'
  },
  headerText: {
    color: '#fff',
    fontSize: 30
  },
  jobListing: {
    backgroundColor: '#C2B4B4',
    width: '80%',
    height: '70%'
  },
  title: {
    backgroundColor: '#717171',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '8%'
  },
  titleText: {
    color: '#fff',
    fontSize: 28
  },
  form: {
    backgroundColor: '#fff',
    margin: '5%',
    height: '75%',
    justifyContent: 'center',
    borderRadius: 5
  },
  formEntries: {
    flexDirection: 'row',
    margin: '5%'
  },
  topEntries: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '40%'
  },
  description: {
    height: '45%'
  },
  bottomEntry: {
    justifyContent: 'space-around',
    height: '15%'
  },
  smallInput: {
    width: '100%'
  },
  largeInput: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    overflow: 'scroll'
  },
  post: {
    alignItems: 'flex-end',
    marginEnd: '5%',
    marginBottom: '100%' // if removed, button is off on web
  },
  postButton: {
    ...theme.buttons.feedStandard,
    backgroundColor: theme.colors.cardBackground
  },
  buttonText: {
    ...theme.textVariants.body,
    alignSelf: 'center'
  }
});

export default DraftScreen;
