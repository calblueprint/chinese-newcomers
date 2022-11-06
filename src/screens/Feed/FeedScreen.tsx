import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { createJob, getAllJobs, deleteJob, getJob } from '../../firebase/firestore/job';
import { Job } from '../../types/types';

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
        <View style={styles.redSquare}></View>
        <Text style={styles.feedTitle}>Welcome!</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center'
        }}>
        {list.map((job) => {
          return (
            // eslint-disable-next-line react/jsx-key
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
      </ScrollView>
      <Button title="Back" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default FeedScreen;
