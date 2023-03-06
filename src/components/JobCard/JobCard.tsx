/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Text, View, Pressable, Modal, SectionList, ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
// import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import styles from './CardStyles';
import { objectToMap } from '../../firebase/helpers';
import StyledButton from '../StyledButton/StyledButton';
import { Job } from '../../types/types';
import { deleteJob, createJob } from '../../firebase/firestore/job';


interface JobCardProps {
  job: Job;
  idx: number;
  pending: boolean;
  pendingJobs: Job[];
  setPendingJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

function JobCard({ job, idx, pending, pendingJobs, setPendingJobs }: JobCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const visibleMap = objectToMap(job.visible);

  async function handleAction(approve: boolean) {
    setModalVisible(false);
    try {
      await deleteJob(job.id, 'notApprovedJobs');
      if (approve) {
        await createJob(job, 'approvedJobs');
      }
    } catch (e) {
      console.log(e);
    }
    setPendingJobs(pendingJobs.filter((_, index) => index !== idx));
  }

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
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }
          }>
          <SafeAreaView style={styles.centeredView}>
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 75 }}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalJobRefText}>{job.id}</Text>
                <Text style={styles.modalJobNameText}>{job.jobPosition}</Text>
              </View>
              <View style={styles.modalInfo}>
                {visibleMap.get('salary') === true && job.salary !== '' && (
                  <Text style={styles.modalText}>salary: {job.salary} </Text>
                )}
                {visibleMap.get('contactPerson') === true && job.contactPerson !== '' && (
                  <Text style={styles.modalText}>contact: {job.contactPerson}</Text>
                )}
                {visibleMap.get('date') === true && job.date !== '' && (
                  <Text style={styles.modalText}>date: {job.date}</Text>
                )}
                {visibleMap.get('companyName') === true && job.companyName !== '' && (
                  <Text style={styles.modalText}>companyName: {job.companyName}</Text>
                )}
                {visibleMap.get('address') === true && job.address !== '' && (
                  <Text style={styles.modalText}>address: {job.address}</Text>
                )}

                {visibleMap.get('phone') === true && job.phone !== '' && (
                  <Text style={styles.modalText}>phone: {job.phone}</Text>
                )}
                {visibleMap.get('languageRequirement') === true &&
                  job.languageRequirement !== '' && (
                    <Text style={styles.modalText}>
                      language requirement: {job.languageRequirement}
                    </Text>
                  )}
                {visibleMap.get('workingHours') === true && job.workingHours !== '' && (
                  <Text style={styles.modalText}>working hours: {job.workingHours}</Text>
                )}
                {visibleMap.get('workingDays') === true && job.workingDays !== '' && (
                  <Text style={styles.modalText}>working days: {job.workingDays}</Text>
                )}
                {visibleMap.get('probationPeriod') === true && job.probationPeriod !== '' && (
                  <Text style={styles.modalText}>probation period: {job.probationPeriod}</Text>
                )}
                {visibleMap.get('employeeBenefit') === true && job.employeeBenefit !== '' && (
                  <Text style={styles.modalText}>employee benefits: {job.employeeBenefit}</Text>
                )}
                {visibleMap.get('otherInfo') === true && job.otherInfo !== '' && (
                  <Text style={styles.modalText}>other info: {job.otherInfo}</Text>
                )}
                {pending && (
                  <View style={styles.buttonContainer}>
                    <StyledButton
                      text="decline"
                      onPress={async () => await handleAction(false)}
                      buttonStyle={{
                        width: 150,
                        height: 65, 
                        backgroundColor: '#FFFFFF',
                        borderColor: '#CC433C'
                      }}
                      textStyle={{ fontSize: 16, color: '#CC433C' }}
                    />
                    <StyledButton
                      text="approve"
                      onPress={async () => await handleAction(true)}
                      buttonStyle={{ width: 150, height: 65 }}
                    />
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          </SafeAreaView>
        </Modal>
      </GestureRecognizer>
      <View style={styles.jobRef}>
        <Text style={styles.jobRefText}>{job.id}</Text>
      </View>
      <View style={styles.jobName}>
        <Text style={styles.jobNameText}>{job.jobPosition}</Text>
      </View>
    </Pressable>
  );
}

export default JobCard;
