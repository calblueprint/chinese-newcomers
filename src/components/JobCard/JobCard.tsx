import React, { useContext, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, Pressable, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Empty from '../../assets/empty.svg';
import Filled from '../../assets/filled.svg';
import { AuthContext } from '../../context/AuthContext';
import { changeBookmark } from '../../firebase/auth';
import {
  createJob,
  deleteJob, removeBookmarkedJobFromAllUsers, updatejob
} from '../../firebase/firestore/job';
import { getBookmarks } from '../../firebase/firestore/user';
import objectToBooleanMap from '../../firebase/helpers';
import { Job, JobFormValues, jobInstance } from '../../types/types';
import FormInput from "../JobPostFormInput/JobPostFormInput";
import StyledButton from '../StyledButton/StyledButton';
import styles from './CardStyles';

interface JobCardProps {
  job: Job;
  pending: boolean;
  bookmarkedJobs: Job[] | null;
  setBookmarkedJobs: React.Dispatch<React.SetStateAction<Job[]>> | null;
}

function JobCard({
  job,
  pending,
  bookmarkedJobs,
  setBookmarkedJobs,
}: JobCardProps) {
  const [jobState, setJobState] = useState(job);
  const [modalVisible, setModalVisible] = useState(false);
  const visibleMap = objectToBooleanMap(jobState.visible);

  const { userObject } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const jobId = job.id;
  const userBookmarkedJobs = userObject?.bookmarkedJobs;
  const [bookmarkValue, setBookmarkValue] = useState<boolean>(
    getBookmarks(job.id, userObject?.bookmarkedJobs),
  );
  const userObjectToString = JSON.stringify(userObject?.bookmarkedJobs);

  useEffect(() => {
    const getBookmarkValue = () => {
      const bookmarks = getBookmarks(job.id, userObject?.bookmarkedJobs);
      setBookmarkValue(bookmarks);
    };
    getBookmarkValue();
  }, [job.id, userObjectToString, userObject, userBookmarkedJobs]);
  
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
      await removeBookmarkedJobFromAllUsers(job.id, 'approvedJobs');
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
        </View> : <View style={styles.fieldText}><Text style={styles.jobNameText}>{field}: </Text><Text style={styles.modalText}>{value as string}</Text></View>)
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
  const toggleBookmark = async (val: boolean) => {
    if (userObject !== null) {
      changeBookmark(dispatch, { jobId, userBookmarkedJobs });
    }
    setBookmarkValue(!val);
    if (bookmarkedJobs === null) {
      return;
    }
    setBookmarkedJobs?.(bookmarkedJobs?.filter(next => next.id !== job.id));
  };
  
  const date = new Date(job.date.seconds * 1000);

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
                <Text style={styles.modalJobRefText}>#{jobState.id}</Text>
                <Text style={styles.modalJobNameText}>{jobState.jobPosition}</Text>
              </View>
              <FormProvider {...methods}>
              <View style={styles.modalInfo}>
                
              <View>
                {visibleMap.get('date') === true && (
                  <Text style={styles.modalText}>
                    <Text style={styles.modalFieldName}>date: </Text>
                    <Text>{date.toDateString()}</Text>
                  </Text>
                )}
                {jobKeys.map((k) => (
                  (k !== "date" && jobCardField(k, jobState[k as keyof typeof jobState]))
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
        <Text style={styles.jobRefText}>#{jobState.id}</Text>
      </View>
      <View style={styles.jobName}>
        <Text style={styles.jobNameText}>{jobState.jobPosition}</Text>
        <Pressable
          onPress={() => {
            toggleBookmark(bookmarkValue);
          }}
        >
          {bookmarkValue ? <Filled /> : <Empty />}
        </Pressable>
      </View>
    </Pressable>
  );
}

export default JobCard;
