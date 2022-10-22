<<<<<<< HEAD
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const FeedScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Job Feed</Text>
      <Button title="Back" style={styles.button} onPress={() => navigation.navigate('Home')} />
=======
import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import  JobCard from "../components/JobCard/JobCard";
import styles from './Styles';
import { createJob, getAllJobs, deleteJob, parseJob, getJob } from '../firebase/firestore/job';

const testFirebase = async () => {
  try {
    const List = await getAllJobs();
    console.log(List);
  }
  catch(e) {
    console.log('error');
  }
}
const auth = getAuth();
const FeedScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <View style= {styles.feedHeader}>
        <Text style= {styles.feedTitle}>CNSC Job Postings</Text>
      </View>
        <JobCard title = 'job title' description= 'description' salary={30} hours= {0} employer='employer' contact_info='contact'></JobCard>
        <JobCard title = 'job title' description= 'description' salary={30} hours= {0} employer='employer' contact_info='contact'></JobCard>
      <Button
        title="Back"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="TestFirebase"
        onPress= {testFirebase}
      />
>>>>>>> 7a59899 (Mia modular card (#16))
    </View>
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 10
  }
});

=======
>>>>>>> 7a59899 (Mia modular card (#16))
export default FeedScreen;
