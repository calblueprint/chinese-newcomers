import { Text, View, Pressable, Modal } from 'react-native';
import styles from './CardStyles';
import React, { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

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
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
const JobCard = ({ title, description, employer, hours, salary, contact_info }: JobCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => {
        setModalVisible(true);
      }}>
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeDown={() => {
          setModalVisible(!modalVisible);
        }}>
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
                <Text style={styles.modalJobRefText}>{title}</Text>
                <Text style={styles.modalJobNameText}>{title}</Text>
              </View>
              <View style={styles.modalInfo}>
                <Text style={styles.modalText}>employer: {employer}</Text>
                <Text style={styles.modalText}>hours: {hours}</Text>
                <Text style={styles.modalText}>salary: {salary}</Text>
                <Text style={styles.modalText}>{description}</Text>
                <Text style={styles.modalText}>contact: {contact_info}</Text>
              </View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
      <View style={styles.jobRef}>
        <Text style={styles.jobRefText}>{title}</Text>
      </View>
      <View style={styles.jobName}>
        <Text style={styles.jobNameText}>{description}</Text>
      </View>
      <View style={styles.cardFooter}></View>
    </Pressable>
  );
};

export default JobCard;
