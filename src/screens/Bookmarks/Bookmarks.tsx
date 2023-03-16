import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { BookmarksStackScreenProps } from '../../types/navigation';
import JobCard from '../../components/JobCard/JobCard';

function BookmarksScreen({
  navigation,
}: BookmarksStackScreenProps<'BookmarksScreen'>) {
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
