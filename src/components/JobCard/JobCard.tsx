/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Text, View, Pressable, Modal, Image } from 'react-native';
import styles from './CardStyles';
import React, { useEffect, useState } from 'react';
// import GestureRecognizer from 'react-native-swipe-gestures';
import { objectToMap } from '../../firebase/helpers';
import Empty_heart from '../../assets/empty-heart.png';
import filled_heart from '../../assets/filled-heart.png';
import Ex from '../../assets/ex.png';
import { getAllJobs, updateLike } from '../../firebase/firestore/job';
import { Job } from '../../types/types';

interface JobCardProps {
  idx: number;
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
  jobList: Job[];
  setList: React.Dispatch<React.SetStateAction<Job[]>>;
}

const JobCard = ({
  idx,
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
  liked,
  jobList,
  setList
}: JobCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [likeValue, setLikeValue] = useState(liked);
  const visibleMap = objectToMap(visible);

  const toggleLike = () => {
    setLikeValue((likeValue) => !likeValue);
  };

  useEffect(() => {
    const updateFirebase = async () => {
      await updateLike(id, likeValue);
    };
    updateFirebase().catch(console.error);

    const fetchJobs = async () => {
      // const data = await getAllJobs();
      const currList = [...jobList];
      const currJob = currList[idx];
      currJob.liked = likeValue;
      currList[idx] = currJob;
      setList(currList);
    };
    void fetchJobs();
  }, [likeValue]);

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => {
        setModalVisible(true);
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
              {/* <Image source={'Ex'} style={styles.heart}></Image> */}
              <Text style={styles.modalJobRefText}>{id}</Text>
              <View style={styles.jobNameModal}>
                <Text style={styles.modalJobNameText}>{jobPosition}</Text>
                <Pressable
                  onPress={() => {
                    toggleLike();
                  }}>
                  <Image
                    source={likeValue ? filled_heart : Empty_heart}
                    style={styles.heart}></Image>
                </Pressable>
              </View>
            </View>
            <View style={styles.modalInfo}>
              {visibleMap.get('salary') === true && salary !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>salary: </Text>
                  <Text style={styles.modalText}> {salary} </Text>
                </Text>
              )}
              {visibleMap.get('contactPerson') === true && contactPerson !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>contact person: </Text>
                  <Text style={styles.modalText}> {contactPerson} </Text>
                </Text>
              )}
              {visibleMap.get('date') === true && date !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>date: </Text>
                  <Text style={styles.modalText}> {date} </Text>
                </Text>
              )}
              {visibleMap.get('companyName') === true && companyName !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>company name: </Text>
                  <Text style={styles.modalText}> {companyName} </Text>
                </Text>
              )}
              {visibleMap.get('address') === true && address !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>address: </Text>
                  <Text style={styles.modalText}> {address} </Text>
                </Text>
              )}
              {visibleMap.get('phone') === true && phone !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>phone number: </Text>
                  <Text style={styles.modalText}> {phone} </Text>
                </Text>
              )}
              {visibleMap.get('languageRequirement') === true && languageRequirement !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>language requirement: </Text>
                  <Text style={styles.modalText}> {languageRequirement} </Text>
                </Text>
              )}
              {visibleMap.get('workingHours') === true && workingHours !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>working hours: </Text>
                  <Text style={styles.modalText}> {workingHours} </Text>
                </Text>
              )}
              {visibleMap.get('workingDays') === true && workingDays !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>working days: </Text>
                  <Text style={styles.modalText}> {workingDays} </Text>
                </Text>
              )}
              {visibleMap.get('probationPeriod') === true && probationPeriod !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>probation period: </Text>
                  <Text style={styles.modalText}> {probationPeriod} </Text>
                </Text>
              )}
              {visibleMap.get('employeeBenefit') === true && employeeBenefit !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>employee benefit: </Text>
                  <Text style={styles.modalText}> {employeeBenefit} </Text>
                </Text>
              )}
              {visibleMap.get('otherInfo') === true && otherInfo !== '' && (
                <Text style={styles.modalText}>
                  <Text style={styles.boldModalText}>other info: </Text>
                  <Text style={styles.modalText}> {otherInfo} </Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
      {/* </Pressable> */}
      <View style={styles.jobRef}>
        <Text style={styles.jobRefText}>{id}</Text>
      </View>
      <View style={styles.jobName}>
        <Text style={styles.jobNameText}>{jobPosition}</Text>
        <Pressable
          onPress={() => {
            toggleLike();
          }}>
          <Image source={likeValue ? filled_heart : Empty_heart} style={styles.heart}></Image>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default JobCard;
