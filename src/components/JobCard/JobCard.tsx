/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Empty from '../../assets/empty.svg';
import Filled from '../../assets/filled.svg';
import { AuthContext } from '../../context/AuthContext';
import { changeBookmark } from '../../firebase/auth';
import { removeCreatedJobs } from '../../firebase/firestore/employer';
import {
  createJob,
  deleteJob,
  removeBookmarkedJobFromAllUsers,
} from '../../firebase/firestore/job';
import { getBookmarks, getUser } from '../../firebase/firestore/user';
import { objectToBooleanMap } from '../../firebase/helpers';
import { Job } from '../../types/types';
import StyledButton from '../StyledButton/StyledButton';
import styles from './styles';

interface JobCardProps {
  job: Job;
  pending: boolean;
  bookmarkedJobs: Job[] | null;
  setBookmarkedJobs: React.Dispatch<React.SetStateAction<Job[]>> | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>> | null;
}

function JobCard({
  job,
  pending,
  bookmarkedJobs,
  setBookmarkedJobs,
  setOpen,
}: JobCardProps) {
  const { userObject } = useContext(AuthContext);
  const isAdmin = userObject?.access === 'admin';
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
        if (userObject === null) {
          console.log('No userObject found.');
        } else {
          await createJob(job, 'approvedJobs', job.creator, userObject.access);
        }
      } else {
        const creator = await getUser(job.creator);
        if (creator?.access === 'employer') {
          removeCreatedJobs(job.id, job.creator);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function removeJob() {
    setModalVisible(false);
    try {
      await removeBookmarkedJobFromAllUsers(job.id);
      const creator = await getUser(job.creator);
      if (creator?.access === 'employer') {
        removeCreatedJobs(job.id, job.creator);
      }
    } catch (e) {
      console.log(e);
    }
  }

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

  function closeDropdown() {
    setModalVisible(true);
    if (setOpen !== null) {
      setOpen(false);
    }
  }

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => {
        closeDropdown();
      }}
    >
      <View>
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => {
              setModalVisible(false);
            }}
            style={styles.centeredView}
          >
            <ScrollView style={styles.scrollView}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => console.log('do nothing')}
              >
                <View style={styles.modalView}>
                  {/* header */}
                  <View style={styles.modalHeader}>
                    <Pressable
                      onPress={() => setModalVisible(false)}
                      style={styles.exitButton}
                    >
                      <Text style={styles.modalButtonText}>x</Text>
                    </Pressable>
                    <Text style={styles.modalJobRefText}>#{job.id}</Text>
                    <Text style={styles.modalJobNameText}>
                      {job.jobPosition}
                    </Text>
                  </View>

                  <View style={styles.modalInfo}>
                    {(visibleMap.get('date') === true || isAdmin) && (
                      <Text style={styles.modalText}>
                        <Text style={styles.modalFieldName}>Date: </Text>
                        <Text>{date.toDateString()}</Text>
                      </Text>
                    )}
                    {(visibleMap.get('companyName') === true || isAdmin) &&
                      job.companyName !== '' && (
                        <Text style={styles.modalText}>
                          <Text style={styles.modalFieldName}>
                            Company Name:{' '}
                          </Text>
                          <Text>{job.companyName}</Text>
                        </Text>
                      )}
                    {(visibleMap.get('address') === true || isAdmin) &&
                      job.address !== '' && (
                        <Text style={styles.modalText}>
                          <Text style={styles.modalFieldName}>Location: </Text>
                          <Text>{job.address}</Text>
                        </Text>
                      )}
                    {(visibleMap.get('contactPerson') === true || isAdmin) &&
                      job.contactPerson !== '' && (
                        <Text style={styles.modalText}>
                          <Text style={styles.modalFieldName}>
                            Contact Person:{' '}
                          </Text>
                          <Text>{job.contactPerson}</Text>
                        </Text>
                      )}
                    {(isAdmin ||
                      (visibleMap.get('phone') === true &&
                        job.phone !== '')) && (
                      <Text style={styles.modalText}>
                        <Text style={styles.modalFieldName}>Phone: </Text>
                        <Text>{job.phone}</Text>
                      </Text>
                    )}
                    {(visibleMap.get('languageRequirement') === true ||
                      isAdmin) &&
                      job.languageRequirement !== '' && (
                        <Text style={styles.modalText}>
                          <Text style={styles.modalFieldName}>
                            Language Requirement:{' '}
                          </Text>
                          <Text>{job.languageRequirement}</Text>
                        </Text>
                      )}
                    {(visibleMap.get('workingHours') === true || isAdmin) &&
                      job.workingHours !== '' && (
                        <Text style={styles.modalText}>
                          <Text style={styles.modalFieldName}>Hours/day: </Text>
                          <Text>{job.workingHours}</Text>
                        </Text>
                      )}
                    {(visibleMap.get('workingDays') === true || isAdmin) &&
                      job.workingDays !== '' && (
                        <Text style={styles.modalText}>
                          <Text style={styles.modalFieldName}>Days/week: </Text>
                          <Text>{job.workingDays}</Text>
                        </Text>
                      )}
                    {((visibleMap.get('salary') === true &&
                      job.salary !== '') ||
                      isAdmin) && (
                      <Text style={styles.modalText}>
                        <Text style={styles.modalFieldName}>Salary: </Text>
                        <Text>{job.salary}</Text>
                      </Text>
                    )}
                    {(visibleMap.get('employeeBenefit') === true || isAdmin) &&
                      job.employeeBenefit !== '' && (
                        <Text style={styles.modalText}>
                          <Text style={styles.modalFieldName}>
                            Employee Benefit:{' '}
                          </Text>
                          <Text>{job.employeeBenefit}</Text>
                        </Text>
                      )}
                    {(visibleMap.get('otherInfo') === true || isAdmin) &&
                      job.otherInfo !== '' && (
                        <Text style={styles.modalText}>
                          <Text style={styles.modalFieldName}>
                            Other Information:{' '}
                          </Text>
                          <Text>{job.otherInfo}</Text>
                        </Text>
                      )}
                  </View>
                </View>

                <View>
                  {pending && (
                    <View style={styles.buttonContainer}>
                      <StyledButton
                        text="decline"
                        onPress={async () => handleAction(false)}
                        buttonStyle={{
                          width: 135,
                          height: 55,
                          backgroundColor: '#FFFFFF',
                          borderColor: '#CC433C',
                        }}
                        textStyle={{ fontSize: 16, color: '#CC433C' }}
                      />
                      <StyledButton
                        text="approve"
                        onPress={async () => handleAction(true)}
                        buttonStyle={{ width: 135, height: 55 }}
                        textStyle={{ fontSize: 16 }}
                      />
                    </View>
                  )}
                  {!pending && userObject?.access === 'admin' && (
                    <View style={styles.singleButtonContainer}>
                      <StyledButton
                        text="remove"
                        onPress={async () => removeJob()}
                        buttonStyle={{
                          width: 135,
                          height: 55,
                        }}
                        textStyle={{}}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </ScrollView>
          </TouchableOpacity>
        </Modal>
      </View>
      <View style={styles.jobRef}>
        <Text style={styles.jobRefText}>#{job.id}</Text>
      </View>

      <View style={styles.jobName}>
        <Text style={styles.jobNameText}>{job.jobPosition}</Text>
        {!pending && (
          <Pressable
            onPress={() => {
              toggleBookmark(bookmarkValue);
            }}
          >
            {bookmarkValue ? <Filled /> : <Empty />}
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

export default JobCard;
