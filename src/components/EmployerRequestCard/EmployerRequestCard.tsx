/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { addAccess } from '../../firebase/firestore/access';
import { deleteEmployerRequest } from '../../firebase/firestore/employerRequest';
import { EmployerRequest } from '../../types/types';
import styles from './styles';

interface EmployerRequestCardProps {
  employerRequest: EmployerRequest;
}

function EmployerRequestCard({ employerRequest }: EmployerRequestCardProps) {
  function approve() {
    addAccess(employerRequest.phoneNumber, 'employer');
    deleteEmployerRequest(employerRequest.phoneNumber);
  }

  function decline() {
    deleteEmployerRequest(employerRequest.phoneNumber);
  }

  return (
    <Pressable style={styles.cardContainer}>
      <View style={styles.cardView}>
        <View style={styles.textView}>
          <Text style={styles.businessNameText}>
            {employerRequest.businessName}
          </Text>
          <Text style={styles.infoText}>{employerRequest.phoneNumber}</Text>
          <Text style={styles.infoText}>{employerRequest.website}</Text>
        </View>
        <View style={styles.buttonView}>
          <Pressable onPress={() => decline()} style={styles.declineButton} />
          <Pressable onPress={() => approve()} style={styles.approveButton} />
        </View>
      </View>
    </Pressable>
  );
}

export default EmployerRequestCard;
