import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const FeedScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Job Feed</Text>
      <Button title="Back" style={styles.button} onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 10
  }
});

export default FeedScreen;
