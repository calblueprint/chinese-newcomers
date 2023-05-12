import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Header from '../../components/Header/Header';
import styles from '../../components/Header/styles';
import BookmarksScreen from '../../screens/Bookmarks/Bookmarks';
import { BookmarksStackParamList } from '../../types/navigation';

const BookmarksStack = createStackNavigator<BookmarksStackParamList>();

function BookmarksHeader() {
  return <Header title="Bookmarked Jobs" />;
}

export default function BookmarksStackNavigator() {
  return (
    <BookmarksStack.Navigator>
      <BookmarksStack.Screen
        name="BookmarksScreen"
        component={BookmarksScreen}
        options={{
          headerTitle: BookmarksHeader,
          headerStyle: styles.headerStyle,
        }}
      />
    </BookmarksStack.Navigator>
  );
}
