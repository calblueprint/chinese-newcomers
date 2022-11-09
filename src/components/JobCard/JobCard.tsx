import { Text, View, Pressable, Modal } from 'react-native';
import styles from './CardStyles';
import React, { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

interface JobCardProps {
  description: string;
  hours: number;
  employer: string;
  contact_info: string;
  id: string;
  date: string;
  companyName: string;
  address: string;
  contactPerson: string;
  phone: string;
  jobPosition: string;
  languageRequirement: string;
  workingHours: string;
  workingDays: string;
  salary: string;
  probationPeriod: string;
  employeeBenefit: string;
  otherInfo: string;
  hidden: Map<string, boolean>;
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
              <Pressable style={styles.hideButton} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>x</Text>
              </Pressable>
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
    </Pressable>
  );
};

export default JobCard;
