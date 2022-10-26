import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { createJob, getAllJobs, deleteJob, getJob } from '../../firebase/firestore/job';
import { Job } from '../../types/types';

const testFirebase = async () => {
  const jobs = await getAllJobs();
  // console.log(list);
};
const auth = getAuth();

const FeedScreen = ({ navigation }: any) => {
  const [list, setList] = useState([] as Job[]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs();
      // console.log(data);
      // console.log('this is the data');
      setList(data);
      console.log(list);
      console.log('this is the data');
    };
    void fetchJobs();
  }, []);

  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>CNSC Job Postings</Text>
      </View>
      {list.map((job) => {
        return (
          <JobCard
            title="hello"
            description={job.description}
            // salary={job.description}
            hours={job.hours}
            employer={job.employer}
            contact_info={job.contact_info}></JobCard>
        );
      })}
      <Button title="Back" onPress={() => navigation.navigate('Home')} />
      <Button title="TestFirebase" onPress={testFirebase} />
    </View>
  );
};

export default FeedScreen;
