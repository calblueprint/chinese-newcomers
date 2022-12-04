/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Text, View, Pressable, Modal } from 'react-native';
import styles from './CardStyles';
import React, { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { objectToMap } from '../../firebase/helpers';

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
  category: string;
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
  category,
  otherInfo,
  salary,
  visible,
  liked
}: JobCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const visibleMap = objectToMap(visible);

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
                <Text style={styles.modalJobRefText}>#{id}</Text>
                <Text style={styles.modalJobNameText}>{jobPosition}</Text>
              </View>
              <View style={styles.modalInfo}>
                {visibleMap.get('salary') === true && salary !== '' && (
                  <Text style={styles.modalText}>salary: {salary} </Text>
                )}
                {visibleMap.get('contactPerson') === true && contactPerson !== '' && (
                  <Text style={styles.modalText}>contact: {contactPerson}</Text>
                )}
                {visibleMap.get('date') === true && date !== '' && (
                  <Text style={styles.modalText}>date: {date}</Text>
                )}
                {visibleMap.get('companyName') === true && companyName !== '' && (
                  <Text style={styles.modalText}>companyName: {companyName}</Text>
                )}
                {visibleMap.get('address') === true && address !== '' && (
                  <Text style={styles.modalText}>address: {address}</Text>
                )}

                {visibleMap.get('phone') === true && phone !== '' && (
                  <Text style={styles.modalText}>phone: {phone}</Text>
                )}
                {visibleMap.get('languageRequirement') === true && languageRequirement !== '' && (
                  <Text style={styles.modalText}>language requirement: {languageRequirement}</Text>
                )}
                {visibleMap.get('workingHours') === true && workingHours !== '' && (
                  <Text style={styles.modalText}>working hours: {workingHours}</Text>
                )}
                {visibleMap.get('workingDays') === true && workingDays !== '' && (
                  <Text style={styles.modalText}>working days: {workingDays}</Text>
                )}
                {visibleMap.get('probationPeriod') === true && probationPeriod !== '' && (
                  <Text style={styles.modalText}>probation period: {probationPeriod}</Text>
                )}
                {visibleMap.get('employeeBenefit') === true && employeeBenefit !== '' && (
                  <Text style={styles.modalText}>employee benefits: {employeeBenefit}</Text>
                )}
                <Text style={styles.modalText}>category: {category}</Text>
                {visibleMap.get('otherInfo') === true && otherInfo !== '' && (
                  <Text style={styles.modalText}>other info: {otherInfo}</Text>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
      <View style={styles.jobRef}>
        <Text style={styles.jobRefText}>#{id}</Text>
      </View>
      <View style={styles.jobName}>
        <Text style={styles.jobNameText}>{jobPosition}</Text>
      </View>
    </Pressable>
  );
};

export default JobCard;
