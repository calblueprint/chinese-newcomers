import React, { useContext, useEffect, useState } from 'react';
import useFirestoreListener from 'react-firestore-listener';
import { ScrollView, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import JobCard from '../../components/JobCard/JobCard';
import { AuthContext } from '../../context/AuthContext';
import { updateUserBookmarks } from '../../firebase/firestore/user';
import { FeedStackScreenProps } from '../../types/navigation';
import { Job } from '../../types/types';
import styles from './styles';

function FeedScreen({ navigation }: FeedStackScreenProps<'FeedScreen'>) {
  const { userObject } = useContext(AuthContext);
  const userBookmarkedJobs = userObject?.bookmarkedJobs;

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', async () => {
      if (userObject?.id === undefined) {
        return;
      }
      await updateUserBookmarks(
        userBookmarkedJobs,
        userObject?.id,
        userObject?.access,
      );
    });
    return unsubscribe;
  }, [navigation, userObject?.id, userBookmarkedJobs, userObject?.access]);

  const [open, setOpen] = useState(false);
  const approvedJobs = useFirestoreListener<Job>({
    collection: 'approvedJobs',
  });
  const [filteredApprovedJobs, setFilteredApprovedJobs] = useState([] as Job[]);
  const [category, setCategory] = useState('all');
  const categories: string[] = [
    'all',
    'factory',
    'caretaker',
    'restaurant',
    'construction',
    'sales',
    'driver',
    'education',
    'finance',
    'management',
    'IT',
    'other',
  ];

  useEffect(() => {
    if (category === 'all') {
      setFilteredApprovedJobs(approvedJobs);
    } else {
      setFilteredApprovedJobs(
        approvedJobs.filter(job => job.category === category),
      );
    }
  }, [category, approvedJobs]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
          marginTop: '8%',
          paddingBottom: 50,
        }}
      >
        <Text style={styles.categoryText}> Filter By Category: </Text>

        <DropDownPicker
          open={open}
          value={category}
          items={categories.map(c => ({ label: c, value: c }))}
          setOpen={setOpen}
          setValue={setCategory}
          listMode="SCROLLVIEW"
          containerStyle={{ width: '85%', marginBottom: '8%' }}
          textStyle={{ fontFamily: 'DMSans_500Medium' }}
        />

        {filteredApprovedJobs.map(job => (
          <JobCard
            job={job}
            key={job.id}
            pending={false}
            bookmarkedJobs={null}
            setBookmarkedJobs={null}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default FeedScreen;
