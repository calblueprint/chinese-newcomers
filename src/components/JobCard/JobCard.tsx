/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Empty from '../../assets/empty.svg';
import Filled from '../../assets/filled.svg';
import { AuthContext } from '../../context/AuthContext';
import { changeBookmark } from '../../firebase/auth';
import {
  createJob,
  deleteJob,
  removeBookmarkedJobFromAllUsers,
} from '../../firebase/firestore/job';
import { getBookmarks } from '../../firebase/firestore/user';
import objectToBooleanMap from '../../firebase/helpers';
import { Job } from '../../types/types';
import StyledButton from '../StyledButton/StyledButton';
import styles from './styles';

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

  const [modalVisible, setModalVisible] = useState(false);
  const visibleMap = objectToBooleanMap(job.visible);
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
  }

  async function removeJob() {
    setModalVisible(false);
    try {
      await removeBookmarkedJobFromAllUsers(job.id, 'approvedJobs');
    } catch (e) {
      console.log(e);
    }
  }

  const toggleBookmark = async (val: boolean) => {
    if (userObject !== null) {
      console.log('before:', userBookmarkedJobs);
      changeBookmark(dispatch, { jobId, userBookmarkedJobs });
      console.log('after:', userBookmarkedJobs);
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
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>X</Text>
                </Pressable>
                <Text style={styles.modalJobRefText}>#{job.id}</Text>
                <Text style={styles.modalJobNameText}>{job.jobPosition}</Text>
              </View>
              <View style={styles.modalInfo}>
                {visibleMap.get('salary') === true && job.salary !== '' && (
                  <Text style={styles.modalText}>
                    <Text style={styles.modalFieldName}>salary: </Text>
                    <Text>{job.salary}</Text>
                  </Text>
                )}
                {visibleMap.get('contactPerson') === true &&
                  job.contactPerson !== '' && (
                    <Text style={styles.modalText}>
                      <Text style={styles.modalFieldName}>contact: </Text>
                      <Text>{job.contactPerson}</Text>
                    </Text>
                  )}
                {visibleMap.get('date') === true && (
                  <Text style={styles.modalText}>
                    <Text style={styles.modalFieldName}>date: </Text>
                    <Text>{date.toDateString()}</Text>
                  </Text>
                )}
                {visibleMap.get('companyName') === true &&
                  job.companyName !== '' && (
                    <Text style={styles.modalText}>
                      <Text style={styles.modalFieldName}>companyName: </Text>
                      <Text>{job.companyName}</Text>
                    </Text>
                  )}
                {visibleMap.get('address') === true && job.address !== '' && (
                  <Text style={styles.modalText}>
                    <Text style={styles.modalFieldName}>address: </Text>
                    <Text>{job.address}</Text>
                  </Text>
                )}

                {visibleMap.get('phone') === true && job.phone !== '' && (
                  <Text style={styles.modalText}>
                    <Text style={styles.modalFieldName}>phone: </Text>
                    <Text>{job.phone}</Text>
                  </Text>
                )}
                {visibleMap.get('languageRequirement') === true &&
                  job.languageRequirement !== '' && (
                    <Text style={styles.modalText}>
                      <Text style={styles.modalFieldName}>
                        languageRequirement:{' '}
                      </Text>
                      <Text>{job.languageRequirement}</Text>
                    </Text>
                  )}
                {visibleMap.get('workingHours') === true &&
                  job.workingHours !== '' && (
                    <Text style={styles.modalText}>
                      <Text style={styles.modalFieldName}>workingHours: </Text>
                      <Text>{job.workingHours}</Text>
                    </Text>
                  )}
                {visibleMap.get('workingDays') === true &&
                  job.workingDays !== '' && (
                    <Text style={styles.modalText}>
                      <Text style={styles.modalFieldName}>workingDays: </Text>
                      <Text>{job.workingDays}</Text>
                    </Text>
                  )}
                {visibleMap.get('probationPeriod') === true &&
                  job.probationPeriod !== '' && (
                    <Text style={styles.modalText}>
                      <Text style={styles.modalFieldName}>
                        probationPeriod:{' '}
                      </Text>
                      <Text>{job.probationPeriod}</Text>
                    </Text>
                  )}
                {visibleMap.get('employeeBenefit') === true &&
                  job.employeeBenefit !== '' && (
                    <Text style={styles.modalText}>
                      <Text style={styles.modalFieldName}>
                        employeeBenefit:{' '}
                      </Text>
                      <Text>{job.employeeBenefit}</Text>
                    </Text>
                  )}
                {visibleMap.get('otherInfo') === true &&
                  job.otherInfo !== '' && (
                    <Text style={styles.modalText}>
                      <Text style={styles.modalFieldName}>otherInfo: </Text>
                      <Text>{job.otherInfo}</Text>
                    </Text>
                  )}
                {pending && (
                  <View style={styles.buttonContainer}>
                    <StyledButton
                      text="decline"
                      onPress={async () => handleAction(false)}
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
                      onPress={async () => handleAction(true)}
                      buttonStyle={{ width: '45%', height: '50%' }}
                      textStyle={{ fontSize: 16 }}
                    />
                  </View>
                )}
                {!pending && (
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
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
      <View style={styles.jobRef}>
        <Text style={styles.jobRefText}>#{job.id}</Text>
      </View>
      <View style={styles.jobName}>
        <Text style={styles.jobNameText}>{job.jobPosition}</Text>
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
