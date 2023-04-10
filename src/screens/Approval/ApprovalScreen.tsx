import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import useFirestoreListener from 'react-firestore-listener';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { Job } from '../../types/types';
import { ApprovalStackScreenProps } from '../../types/navigation';

function ApprovalScreen({
  navigation,
}: ApprovalStackScreenProps<'ApprovalScreen'>) {
  const notApprovedJobs = useFirestoreListener<Job>({
    collection: 'notApprovedJobs',
  });

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
