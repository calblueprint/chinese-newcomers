import React from 'react';
import useFirestoreListener from 'react-firestore-listener';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import JobCard from '../../components/JobCard/JobCard';
import { ApprovalStackScreenProps } from '../../types/navigation';
import { Job } from '../../types/types';
import styles from './styles';

function ApprovalScreen({
  navigation,
}: ApprovalStackScreenProps<'ApprovalScreen'>) {
  const notApprovedJobs = useFirestoreListener<Job>({
    collection: 'notApprovedJobs',
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
        }}
      >
        {notApprovedJobs.map(job => (
          <JobCard
            job={job}
            key={job.id}
            pending
            bookmarkedJobs={null}
            setBookmarkedJobs={null}
          />
        ))}
        {notApprovedJobs.length === 0 && (
          <Text style={{ marginTop: '10%' }}>
            No pending job drafts to review!
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ApprovalScreen;
