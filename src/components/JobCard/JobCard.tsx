/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Text, View, Pressable, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styles from './CardStyles';
import objectToBooleanMap from '../../firebase/helpers';
import StyledButton from '../StyledButton/StyledButton';
import { Job, JobFormValues, jobInstance } from '../../types/types';
import { deleteJob, createJob, updatejob } from '../../firebase/firestore/job';
import FormInput from "../JobPostFormInput/JobPostFormInput";

interface JobCardProps {
  job: Job;
  pending: boolean;
}

function JobCard({
  job,
  pending,
}: JobCardProps) {
  const [jobState, setJobState] = useState(job);
  const [modalVisible, setModalVisible] = useState(false);
  const visibleMap = objectToBooleanMap(jobState.visible);

  async function handlePendingAction(approve: boolean) {
    setModalVisible(false);
    try {
      await deleteJob(jobState.id, 'notApprovedJobs');
      if (approve) {
        await createJob(jobState, 'approvedJobs');
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function removeJob() {
    setModalVisible(false);
    try {
      await deleteJob(jobState.id, 'approvedJobs');
    } catch (e) {
      console.log(e);
    }
  }

  const [editing, setEditing] = useState(false);

  const jobCardField = (field: string, value: string | object) => {
    if (visibleMap.get(field) && value !== '') {
      const staticText = `${field}: ${value}`;
      return (editing ? 
        <View>
          <Text style={styles.modalFieldTitle}>{field}</Text>
          <FormInput
              name={field}
              label={field}
              defaultValue={value}
              rules={{ required: 'Date is required!' }}
            />
        </View> : <Text style={styles.modalText}>{staticText}</Text>)
    }
    return null;
  }

  const onSave: SubmitHandler<JobFormValues> = async data => {
    setEditing(false);
    const updatedJob = Object.assign(jobState, data);
    setJobState({...jobState});
    updatejob(updatedJob);
  }

  const { ...methods } = useForm<JobFormValues>();

  const jobKeys = Object.keys(jobInstance);

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
            setEditing(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>X</Text>
                </Pressable>
                <Text style={styles.modalJobRefText}>{jobState.id}</Text>
                <Text style={styles.modalJobNameText}>{jobState.jobPosition}</Text>
              </View>
              <FormProvider {...methods}>
              <View style={styles.modalInfo}>
                
              <View>
                {jobKeys.map((k) => (
                  jobCardField(k, jobState[k as keyof typeof jobState])
                ))}
              </View>
                
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
                      text="Save"
                      onPress={methods.handleSubmit(onSave)}
                      buttonStyle={{
                        width: '45%',
                        height: '50%',
                      }}
                      textStyle={{}}
                    />
                    <StyledButton
                      text="Discard"
                      onPress={() => setEditing(false)}
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
        <Text style={styles.jobRefText}>{jobState.id}</Text>
      </View>
      <View style={styles.jobName}>
        <Text style={styles.jobNameText}>{jobState.jobPosition}</Text>
      </View>
    </Pressable>
  );
}

export default JobCard;
