import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function LoadingSpinner() {
  return <ActivityIndicator style={{ flex: 1 }} size="large" color="cc433c" />;
}
