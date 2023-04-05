/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Text, View, Pressable, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './CardStyles';
import objectToBooleanMap from '../../firebase/helpers';
import StyledButton from '../StyledButton/StyledButton';
import { Job } from '../../types/types';
import { deleteJob, createJob } from '../../firebase/firestore/job';
import FormInput from "../JobPostFormInput/JobPostFormInput";

interface JobCardProps {
  job: Job;
  idx: number;
  pending: boolean;
  pendingJobs: Job[] | null;
  setPendingJobs: React.Dispatch<React.SetStateAction<Job[]>> | null;
  filteredJobs: Job[] | null;
  setFilteredJobs: React.Dispatch<React.SetStateAction<Job[]>> | null;
}

function JobCard({
  job,
  idx,
  pending,
  pendingJobs,
  setPendingJobs,
  filteredJobs,
  setFilteredJobs,
}: JobCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const visibleMap = objectToBooleanMap(job.visible);

  async function handlePendingAction(approve: boolean) {
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

  async function removeJob() {
    setModalVisible(false);
    try {
      await deleteJob(job.id, 'approvedJobs');
    } catch (e) {
      console.log(e);
    }
    setFilteredJobs(filteredJobs.filter((_, index) => index !== idx));
  }

  const [editing, setEditing] = useState(false);


  const jobCardField = (field: string) => {
    let result;
    const fieldValue = job[field as keyof typeof job] as string;
    if (visibleMap.get(field) && fieldValue !== '') {
      if (editing) {
        result = <View>
          <Text style={styles.modalFieldTitle}>{field}</Text>
          <TextInput style={styles.modalInput} defaultValue={fieldValue}
          /></View>
      } else {
        const staticText = `${field}: ${fieldValue}`;
        result = <Text style={styles.modalText}>{staticText}</Text>;
      }
    }
    return result;
  }

  interface FormValues {
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
  }
  const { ...methods } = useForm<FormValues>();

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeDown={() => {
          setModalVisible(false);
        }}
      >
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>X</Text>
                </Pressable>
                <Text style={styles.modalJobRefText}>{job.id}</Text>
                <Text style={styles.modalJobNameText}>{job.jobPosition}</Text>
              </View>
              <FormProvider {...methods}>
              <View style={styles.modalInfo}>
                {jobCardField('salary')}
                {jobCardField('contactPerson')}
                {jobCardField('date')}
                {jobCardField('companyName')}
                {jobCardField('address')}
                {jobCardField('phone')}
                {jobCardField('languageRequirement')}
                {jobCardField('workingHours')}
                {jobCardField('workingDays')}
                {jobCardField('probationPeriod')}
                {jobCardField('employeeBenefit')}
                {jobCardField('otherInfo')}
                {pending && (
                  <View style={styles.buttonContainer}>
                    <StyledButton
                      text="decline"
                      onPress={async () => handlePendingAction(false)}
                      buttonStyle={{
                        width: '45%',
                        height: '50%',
                        backgroundColor: '#FFFFFF',
                        borderColor: '#CC433C',
                      }}
                      textStyle={{ fontSize: 16, color: '#CC433C' }}
                    />
                    <StyledButton
                      text="approve"
                      onPress={async () => handlePendingAction(true)}
                      buttonStyle={{ width: '45%', height: '50%' }}
                      textStyle={{ fontSize: 16 }}
                    />
                  </View>
                )}
                {!pending && !editing && (
                  <View style={styles.singleButtonContainer}>
                    <StyledButton
                      text="remove"
                      onPress={async () => removeJob()}
                      buttonStyle={{
                        width: '45%',
                        height: '50%',
                      }}
                      textStyle={{}}
                    />
                    <StyledButton
                      text="edit"
                      onPress={() => setEditing(true)}
                      buttonStyle={{
                        width: '45%',
                        height: '50%',
                      }}
                      textStyle={{}}
                    />
                  </View>
                )}
                {editing && (
                  <View style={styles.singleButtonContainer}>
                    <StyledButton
                      text="Discard"
                      onPress={() => setEditing(false)}
                      buttonStyle={{
                        width: '45%',
                        height: '50%',
                      }}
                      textStyle={{}}
                    />
                    <StyledButton
                      text="Approve"
                      onPress={() => setEditing(!editing)}
                      buttonStyle={{
                        width: '45%',
                        height: '50%',
                      }}
                      textStyle={{}}
                    />
                  </View>
                )}
              </View>
              </FormProvider>
            </View>
          </View>
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
