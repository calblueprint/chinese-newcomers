import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { getAllJobs } from '../../firebase/firestore/job';
import { Job } from '../../types/types';
import theme from '../../styles/theme';

const auth = getAuth();

function ApprovalScreen({ navigation }: any) {
  const [list, setList] = useState([] as Job[]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs('notApprovedJobs');
      setList(data);
    };
    fetchJobs();
  }, [isFocused]);

  function handleJobRemoval(idx: number) {
    setList(list.filter((_, index) => index !== idx))
  }

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
        {list.map((job, index) => (
            // eslint-disable-next-line react/jsx-key
            <JobCard
              job={job}
              idx={index}
              pending
              pendingJobs={list}
              setPendingJobs={setList} />
          ))}
        {list.length == 0 && (
          <Text style={{ marginTop: '10%' }}>No pending job drafts to review!</Text>
        )}
      </ScrollView>
      {/* <View style={styles.footer}>
        <Button title="Back" onPress={() => navigation.navigate('Home')} />
      </View> */}
    </SafeAreaView>
  );
}

export default ApprovalScreen;
