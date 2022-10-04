import { Text, View, Pressable } from "react-native";
import styles from './CardStyles'
import * as React from "react";

const JobCard = ({title, description}:{title: string; description: string}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text>{title}</Text>
      </View>
      <View style={styles.description}>
          <Text>{description}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Pressable style={styles.moreInfoButton}> 
        <Text>More Info</Text> 
        </Pressable>
      </View>
    </View> 
  );
};

export default JobCard;
