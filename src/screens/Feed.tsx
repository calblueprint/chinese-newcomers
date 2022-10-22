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
    </View>
  );
};

export default FeedScreen;
