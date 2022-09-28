import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const FeedScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <View style= {styles.feedHeader}>
        <Text>Job Feed</Text>
      </View>

      <JobCard></JobCard>
      <Button
        title="Back"
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  feedHeader: {

    width: '80%',
    backgroundColor: 'blue',
  },
  button: {
    marginTop: 10,
  },
  cardContainer: {
    width: "80%",
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'red' 

  },
  cardHeader: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'black',
    height: '15%',

  },
  cardFooter: {
    alignItems: "flex-end",

  },
  description: {
    alignItems: "center",
    backgroundColor: 'black',
  },
  moreInfoButton: {
    width: '40%'
  }
});

const JobCard = ({title, description}:{title: string; description: string}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text>{title}</Text>
      </View>
      <View style={styles.description}></View>
      <Text>{description}</Text>
      <View style={styles.cardFooter}>
        <Button
          title="More Info"
          style={styles.moreInfoButton}
        />
      </View>
    </View> 

  );
};

export default FeedScreen;
