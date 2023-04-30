import React, { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { BookmarksStackScreenProps } from '../../types/navigation';
import JobCard from '../../components/JobCard/JobCard';
import { Job } from '../../types/types';
import styles from './styles';
import {
  getBookmarkedJobs,
  updateUserBookmarks,
} from '../../firebase/firestore/user';
import { AuthContext } from '../../context/AuthContext';

function BookmarksScreen({
  navigation,
}: BookmarksStackScreenProps<'BookmarksScreen'>) {
  const [bookmarkedList, setBookmarkedList] = useState([] as Job[]);
  const { userObject } = useContext(AuthContext);
  const userBookmarkedJobs = userObject?.bookmarkedJobs;
  console.log('bookmarks userbookmarks: ', userBookmarkedJobs);

  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      const data = await getBookmarkedJobs(userObject?.bookmarkedJobs);
      setBookmarkedList(data);
    };
    fetchBookmarkedJobs();
  }, [userBookmarkedJobs, userObject?.id, userObject]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', async () => {
      if (userObject?.id === undefined) {
        return;
      }
      await updateUserBookmarks(userBookmarkedJobs, userObject?.id);
    });
    return unsubscribe;
  }, [navigation, userObject?.id, userBookmarkedJobs]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}> Bookmarked Jobs </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
        }}
      >
        {bookmarkedList.map(job => (
          // eslint-disable-next-line react/jsx-key
          <JobCard
            job={job}
            key={job.id}
            pending
            bookmarkedJobs={bookmarkedList}
            setBookmarkedJobs={setBookmarkedList}
          />
        ))}
        {bookmarkedList.length === 0 && (
          <Text style={{ marginTop: '10%' }}>No bookmarked jobs!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default BookmarksScreen;
