import React, { useEffect, useState } from 'react';
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
  const [list, setList] = useState([] as Job[]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs('notApprovedJobs');
      setList(data);
    };
    fetchJobs();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>Pending Job Posts</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
        }}
      >
        {list.map((job, index) => (
          // eslint-disable-next-line react/jsx-key
          <JobCard
            job={job}
            idx={index}
            pending
            pendingJobs={list}
            setPendingJobs={setList}
            filteredJobs={null}
            setFilteredJobs={null}
            bookmarkedJobs={null}
            setBookmarkedJobs={null}
          />
        ))}
        {list.length === 0 && (
          <Text style={{ marginTop: '10%' }}>
            No pending job drafts to review!
          </Text>
        )}
      </ScrollView>
      {/* <View style={styles.footer}>
        <Button title="Back" onPress={() => navigation.navigate('Home')} />
      </View> */}
    </SafeAreaView>
  );
}

export default ApprovalScreen;
