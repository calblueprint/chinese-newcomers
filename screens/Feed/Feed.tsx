import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import JobCard from '../../components/JobCardx/JobCard';
import Styles from

const auth = getAuth();

const FeedScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <View style= {styles.feedHeader}>
        <Text>CNSC Job Postings</Text>
      </View>
        <JobCard title = 'job title' description= 'description'></JobCard>
        <JobCard title = 'job title' description= 'description'></JobCard>
        <JobCard title = 'job title' description= 'description'></JobCard>
      <Button
        title="Back"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default FeedScreen;
