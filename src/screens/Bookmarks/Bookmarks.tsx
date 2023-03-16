import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { BookmarksStackScreenProps } from '../../types/navigation';
import JobCard from '../../components/JobCard/JobCard';
import { Job } from '../../types/types';

function BookmarksScreen({
  navigation,
}: BookmarksStackScreenProps<'BookmarksScreen'>) {
  const [bookmarkedList, setBookmarkedList] = useState([] as Job[]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text> Bookmarked Jobs </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BookmarksScreen;
