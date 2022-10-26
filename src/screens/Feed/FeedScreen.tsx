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
};
const auth = getAuth();

const FeedScreen = ({ navigation }: any) => {
  const [list, setList] = useState([] as Job[]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs();
      setList(data);
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
            hours={job.hours}
            employer={job.employer}
            contact_info={job.contact_info}
            salary={0}
            end_date={undefined}
            job_creator={''}
            start_date={''}></JobCard>
        );
      })}
      <Button title="Back" onPress={() => navigation.navigate('Home')} />
      <Button title="TestFirebase" onPress={testFirebase} />
    </View>
  );
};

export default FeedScreen;
