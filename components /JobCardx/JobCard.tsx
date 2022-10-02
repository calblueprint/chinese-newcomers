import React from "react";
import { Text } from "react-native";
import styles from './Styles'

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

export default JobCard;
