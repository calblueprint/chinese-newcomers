import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { ParamListBase, RouteProp, useIsFocused } from '@react-navigation/native';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { getAllJobs } from '../../firebase/firestore/job';
import { Job } from '../../types/types';
import theme from '../../styles/theme';

const auth = getAuth();

function ApprovalScreen({ navigation }: any) {
  const [pendingJobs, setPendingJobs] = useState([] as Job[]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs('notApprovedJobs');
      setPendingJobs(data);
    };
    fetchJobs();
  }, [isFocused]);

  const filterPendingJobs = useCallback((idx: number) => {
    setPendingJobs(list => list.filter((_, index) => index !== idx))
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <Text style={theme.textVariants.h2}>Pending Job Posts</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%'
        }}>
        {pendingJobs.map((job, index) => (
            // eslint-disable-next-line react/jsx-key
            <JobCard
              job={job}
              idx={index}
              pending
              updateList={filterPendingJobs} />
          ))}
        {pendingJobs.length === 0 && (
          <Text style={{ marginTop: '10%' }}>No pending job drafts to review!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ApprovalScreen;
