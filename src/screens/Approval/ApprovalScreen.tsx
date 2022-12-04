import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { createJob, getAllJobs, deleteJob, getJob } from '../../firebase/firestore/job';
import { Job } from '../../types/types';
import Logo from '../../assets/cnsc-logo.png';

const auth = getAuth();

const ApprovalScreen = ({ navigation }: any) => {
  const [list, setList] = useState([] as Job[]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs('notApprovedJobs');
      setList(data);
    };
    void fetchJobs();
  }, []);

  const { user } = useAuthentication();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
        <Text style={styles.feedTitle}>Pending Job Posts</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%'
        }}>
        {list.map((job, index) => {
          console.log(job);
          return (
            // eslint-disable-next-line react/jsx-key
            <JobCard
              job={job}
              idx={index}
              pending={true}
              pendingJobs={list}
              setPendingJobs={setList}></JobCard>
          );
        })}
        {list.length == 0 && <Text>No pending job drafts to review!</Text>}
      </ScrollView>
      {/* <View style={styles.footer}>
        <Button title="Back" onPress={() => navigation.navigate('Home')} />
      </View> */}
    </SafeAreaView>
  );
};

export default ApprovalScreen;
