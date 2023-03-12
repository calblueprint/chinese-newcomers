import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { getAllJobs } from '../../firebase/firestore/job';
import { Job } from '../../types/types';
import { ApprovalStackScreenProps } from '../../types/navigation';

function ApprovalScreen({
  navigation,
}: ApprovalStackScreenProps<'ApprovalScreen'>) {
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
        <Text style={styles.feedTitle}>Pending Job Posts</Text>
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
              filterList={filterPendingJobs} />
          ))}
        {pendingJobs.length === 0 && (
          <Text style={{ marginTop: '10%' }}>No pending job drafts to review!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ApprovalScreen;
