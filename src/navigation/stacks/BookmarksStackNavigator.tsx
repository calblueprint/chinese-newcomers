import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BookmarksScreen from '../../screens/Bookmarks/Bookmarks';
import { BookmarksStackParamList } from '../../types/navigation';

const BookmarksStack = createNativeStackNavigator<BookmarksStackParamList>();

export default function BookmarksStackNavigator() {
  return (
    <BookmarksStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BookmarksStack.Screen
        name="BookmarksScreen"
        component={BookmarksScreen}
      />
    </BookmarksStack.Navigator>
  );
}
