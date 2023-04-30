/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Empty from '../../assets/empty.svg';
import Filled from '../../assets/filled.svg';
import { AuthContext } from '../../context/AuthContext';
import { changeBookmark } from '../../firebase/auth';
import { addAccess } from '../../firebase/firestore/access';
import { deleteEmployerRequest } from '../../firebase/firestore/employerRequest';
import {
  createJob,
  deleteJob,
  removeBookmarkedJobFromAllUsers,
} from '../../firebase/firestore/job';
import { getBookmarks } from '../../firebase/firestore/user';
import objectToBooleanMap from '../../firebase/helpers';
import { EmployerRequest, Job } from '../../types/types';
import StyledButton from '../StyledButton/StyledButton';
import styles from './styles';

interface EmployerRequestCardProps {
  employerRequest: EmployerRequest
}

function EmployerRequestCard({
  employerRequest
}: EmployerRequestCardProps) {

  function approve() {
    addAccess(employerRequest.phoneNumber, "employer"); 
    deleteEmployerRequest(employerRequest.phoneNumber);
  }

  function decline() {
    deleteEmployerRequest(employerRequest.phoneNumber);
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.jobRef}>
        <Text style={styles.jobRefText}>{employerRequest.companyName}</Text>
      </View>
      <View style={styles.jobName}>
        <Text style={styles.jobNameText}>{employerRequest.phoneNumber}</Text>
        <Text style={styles.jobNameText}>{employerRequest.website}</Text>
        <Pressable
          onPress={() => decline()}
          buttonStyle={{
            width: '45%',
            height: '50%',
            backgroundColor: '#FFFFFF',
            borderColor: '#CC433C',
          }}
          textStyle={{ fontSize: 16, color: '#CC433C' }}
        />
        <Pressable
          text="approve"
          onPress={() => approve()}
          buttonStyle={{ width: '45%', height: '50%' }}
          textStyle={{ fontSize: 16 }}
        />
      </View>
    </View>
  );
}

export default EmployerRequestCard;
