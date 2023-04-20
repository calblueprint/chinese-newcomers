import React, { useEffect, useState, useContext } from 'react';
import useFirestoreListener from 'react-firestore-listener';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Logo from '../../assets/cnsc-logo.png';
import JobCard from '../../components/JobCard/JobCard';
import { AuthContext } from '../../context/AuthContext';
import { getAllJobs } from '../../firebase/firestore/job';
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
      await updateUserBookmarks(userBookmarkedJobs, userObject?.id);
    });
    return unsubscribe;
  }, [navigation, userObject?.id, userBookmarkedJobs]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
        <Text style={styles.feedTitle}>Welcome!</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
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
          <JobCard job={job} key={job.id} pending={false} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FeedScreen;
