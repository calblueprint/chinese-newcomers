import React from 'react';
import useFirestoreListener from 'react-firestore-listener';
import { ScrollView, Text, View } from 'react-native';
import JobCard from '../../components/JobCard/JobCard';
import { ApprovalStackScreenProps } from '../../types/navigation';
import { Job } from '../../types/types';
import styles from './styles';
import { NOT_APPROVED_JOBS_COLLECTION } from '../../firebase/firestore/constants';

function ApprovalScreen({
  navigation,
}: ApprovalStackScreenProps<'ApprovalScreen'>) {
  const notApprovedJobs = useFirestoreListener<Job>({
    collection: NOT_APPROVED_JOBS_COLLECTION,
  });

  return (
    <View style={styles.container}>
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
    </View>
  );
}

export default ApprovalScreen;
