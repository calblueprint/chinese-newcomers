/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
                {employer != null && <Text style={styles.modalText}>employer: {employer}</Text>}
                {salary != null && <Text style={styles.modalText}>salary: {salary}</Text>}
                {description != null && (
                  <Text style={styles.modalText}>description: {description}</Text>
                )}
                {contactPerson != null && (
                  <Text style={styles.modalText}>contact: {contactPerson}</Text>
                )}
                {date != null && <Text style={styles.modalText}>date: {date}</Text>}
                {companyName != null && (
                  <Text style={styles.modalText}>companyName: {companyName}</Text>
                )}
                {address != null && <Text style={styles.modalText}>address: {address}</Text>}
                {phone != null && <Text style={styles.modalText}>phone: {phone}</Text>}
                {languageRequirement != null && (
                  <Text style={styles.modalText}>language requirement: {languageRequirement}</Text>
                )}
                {workingHours != null && (
                  <Text style={styles.modalText}>working hours: {workingHours}</Text>
                )}
                {workingDays != null && (
                  <Text style={styles.modalText}>working days: {workingDays}</Text>
                )}
                {probationPeriod != null && (
                  <Text style={styles.modalText}>probation period: {probationPeriod}</Text>
                )}
                {employeeBenefit != null && (
                  <Text style={styles.modalText}>employee benefits: {employeeBenefit}</Text>
                )}
                {hours != null && <Text style={styles.modalText}>hours: {hours}</Text>}
                {otherInfo != null && <Text style={styles.modalText}>other info: {otherInfo}</Text>}
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
