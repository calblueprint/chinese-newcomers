import React from 'react';
import { Text, View, TextInput, Modal, Pressable } from 'react-native';
// import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
// import { getAuth, signOut } from 'firebase/auth';
import { styles } from './styles';

// const auth = getAuth();

const DraftScreen: React.FC = ({ navigation }: any) => {
  // const { user } = useAuthentication();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [employer, setEmployer] = React.useState('');
  const [hours, setHours] = React.useState('');
  const [salary, setSalary] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [contact, setContact] = React.useState('');

  const submit: any = () => {
    const form = {
      employer,
      hours,
      salary,
      description,
      contact
    };
    console.log(form);
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.jobListing}>
        <View style={styles.title}>
          <Text style={styles.titleText}>New Job Listing</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.topEntries}>
            <View style={styles.formEntries}>
              <Text>employer: </Text>
              <TextInput
                value={employer}
                onChangeText={setEmployer}
                placeholder="employer"
                style={styles.employer}
              />
            </View>
            <View style={styles.formEntries}>
              <Text>hours: </Text>
              <TextInput
                value={hours}
                onChangeText={setHours}
                placeholder="hours"
                style={styles.hours}
              />
            </View>
            <View style={styles.formEntries}>
              <Text>salary: </Text>
              <TextInput
                value={salary}
                onChangeText={setSalary}
                placeholder="salary"
                style={styles.salary}
              />
            </View>
          </View>
          <View style={styles.description}>
            <View style={styles.formEntries}>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="description"
                style={styles.largeInput}
                multiline={true}
              />
            </View>
          </View>
          <View style={styles.bottomEntry}>
            <View style={styles.formEntries}>
              <Text>contact: </Text>
              <TextInput
                value={contact}
                onChangeText={setContact}
                placeholder="contact"
                style={styles.contact}
              />
            </View>
          </View>
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>CONFIRMATION</Text>
              <Text style={styles.modalText}>Do you want to post this job?</Text>
              <View style={styles.modalButtons}>
                <Pressable style={styles.modalButton} onPress={submit}>
                  <Text>yes</Text>
                </Pressable>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text>save</Text>
                </Pressable>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text>no</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.post}>
          <Pressable style={styles.postButton} onPress={() => setModalVisible(true)}>
            <Text>post</Text>
          </Pressable>
        </View>
      </View>
      <Button title="Back" style={styles.button} onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default DraftScreen;
