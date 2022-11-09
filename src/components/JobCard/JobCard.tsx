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
  visible: Object;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
const JobCard = ({
  id,
  description,
  date,
  companyName,
  address,
  contactPerson,
  phone,
  jobPosition,
  languageRequirement,
  workingHours,
  workingDays,
  probationPeriod,
  employeeBenefit,
  otherInfo,
  employer,
  hours,
  salary,
  visible
}: JobCardProps) => {
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
                <Text style={styles.modalJobRefText}>{id}</Text>
                <Text style={styles.modalJobNameText}>{jobPosition}</Text>
              </View>
              <View style={styles.modalInfo}>
                <Text style={styles.modalText}>employer: {employer}</Text>
                <Text style={styles.modalText}>salary: {salary}</Text>
                <Text style={styles.modalText}>{description}</Text>
                <Text style={styles.modalText}>contact: {contactPerson}</Text>
                <Text style={styles.modalText}>contact: {date}</Text>
                <Text style={styles.modalText}>contact: {companyName}</Text>
                <Text style={styles.modalText}>contact: {address}</Text>
                <Text style={styles.modalText}>contact: {phone}</Text>
                <Text style={styles.modalText}>contact: {languageRequirement}</Text>
                <Text style={styles.modalText}>contact: {workingHours}</Text>
                <Text style={styles.modalText}>contact: {workingDays}</Text>
                <Text style={styles.modalText}>contact: {probationPeriod}</Text>
                <Text style={styles.modalText}>contact: {employeeBenefit}</Text>
                <Text style={styles.modalText}>contact: {hours}</Text>
                <Text style={styles.modalText}>contact: {otherInfo}</Text>
              </View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
      <View style={styles.jobRef}>
        <Text style={styles.jobRefText}>{id}</Text>
      </View>
      <View style={styles.jobName}>
        <Text style={styles.jobNameText}>{jobPosition}</Text>
      </View>
    </Pressable>
  );
};

export default JobCard;
