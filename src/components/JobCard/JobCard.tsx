<<<<<<< Updated upstream
<<<<<<< HEAD
import React from 'react';
import { Text } from 'react-native';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const JobCard = () => {
  return <Text>hello</Text>;
=======
import { Text, View, Pressable, Modal, ImageBackground } from "react-native";
import styles from './CardStyles'
import React, {useState} from "react";
=======
import { Text, View, Pressable, Modal, ImageBackground } from 'react-native';
import styles from './CardStyles';
import React, { useState } from 'react';
>>>>>>> Stashed changes

interface JobCardProps {
  title: string;
  description: string;
  employer: string;
  hours: number;
  salary: number;
  contact_info: string;
  end_date: Date;
  job_creator: string;
  start_date: string;
<<<<<<< Updated upstream
>>>>>>> 7a59899 (Mia modular card (#16))
};

=======
}
>>>>>>> Stashed changes

const JobCard = ({
  title,
  description,
  employer,
  hours,
  salary,
  contact_info,
  end_date,
  job_creator,
  start_date
}: JobCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.modalInfo}>
              <Text style={styles.modalText}>employer: {employer}</Text>
              <Text style={styles.modalText}>hours: {hours}</Text>
              <Text style={styles.modalText}>salary: {salary}</Text>
              <Text style={styles.modalText}>{description}</Text>
              <Text style={styles.modalText}>contact: {contact_info}</Text>
            </View>
            <Pressable style={styles.hideButton} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>x</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.cardHeader}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Pressable
          style={styles.moreInfoButton}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text>More Info</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default JobCard;
