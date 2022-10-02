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
        <Text>CNSC Job Postings</Text>
      </View>
      <JobCard title = 'job title' description= 'description'></JobCard>
      <JobCard title = 'job title' description= 'description'></JobCard>

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
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: 'column'
  },

  feedHeader: {
    height: '8%',
    width: '100%',
    backgroundColor: 'blue',
    textColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  createPosting: {
    width: '100%',
    height: '30%',
    alignContent: 'center',
  },
  cardContainer: {
    marginTop: '3%',
    width: "80%",
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#C2B4B4',

  },
  cardHeader: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'grey',
    height: '15%',
  },
  cardFooter: {
    alignItems: "flex-end",

  },
  description: {
    display: 'flex',
    justifyContent: 'center',
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
