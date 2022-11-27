/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Text, View, Pressable, Modal } from 'react-native';
import styles from './CardStyles';
import React, { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { objectToMap, mapToObject } from '../../firebase/helpers';

interface JobCardProps {
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
  liked: boolean;
}

const JobCard = ({
  id,
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
  salary,
  visible,
  liked
}: JobCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const visible2 = objectToMap(visible);
  const test = visible2.get();

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
                {visible2.get('salary') === true && salary != null && (
                  <Text style={styles.modalText}>salary: {salary} </Text>
                )}
                {visible2.get('contactPerson') === true && contactPerson != null && (
                  <Text style={styles.modalText}>contact: {contactPerson}</Text>
                )}
                {visible2.get('date') === true && date != null && (
                  <Text style={styles.modalText}>date: {date}</Text>
                )}
                {visible2.get('companyName') === true && companyName != null && (
                  <Text style={styles.modalText}>companyName: {companyName}</Text>
                )}
                {visible2.get('address') === true && address != null && (
                  <Text style={styles.modalText}>address: {address}</Text>
                )}

                {visible2.get('phone') === true && phone != null && (
                  <Text style={styles.modalText}>phone: {phone}</Text>
                )}
                {visible2.get('languageRequirement') === true && languageRequirement != null && (
                  <Text style={styles.modalText}>language requirement: {languageRequirement}</Text>
                )}
                {visible2.get('workingHours') === true && workingHours != null && (
                  <Text style={styles.modalText}>working hours: {workingHours}</Text>
                )}
                {visible2.get('workingDays') === true && workingDays != null && (
                  <Text style={styles.modalText}>working days: {workingDays}</Text>
                )}
                {visible2.get('probationPeriod') === true && probationPeriod != null && (
                  <Text style={styles.modalText}>probation period: {probationPeriod}</Text>
                )}
                {visible2.get('employeeBenefit') === true && employeeBenefit != null && (
                  <Text style={styles.modalText}>employee benefits: {employeeBenefit}</Text>
                )}
                {visible2.get('otherInfo') === true && otherInfo != null && (
                  <Text style={styles.modalText}>other info: {otherInfo}</Text>
                )}

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
