import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import JobCard from '../../components/JobCard/JobCard';
import { AuthContext } from '../../context/AuthContext';
import {
  getBookmarkedJobs,
  updateUserBookmarks,
} from '../../firebase/firestore/user';
import { BookmarksStackScreenProps } from '../../types/navigation';
import { Job } from '../../types/types';
import styles from './styles';

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
    <View style={styles.container}>
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
            setOpen={null}
          />
        ))}
        {bookmarkedList.length === 0 && (
          <Text style={{ marginTop: '10%' }}>No bookmarked jobs!</Text>
        )}
      </ScrollView>
    </View>
  );
}

export default BookmarksScreen;
