import React, { ReactElement, useContext } from 'react';
import useFirestoreListener from 'react-firestore-listener';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import EmployerRequestCard from '../../../components/EmployerRequestCard/EmployerRequestCard';
import { AuthContext } from '../../../context/AuthContext';
import { AdminSettingsStackScreenProps } from '../../../types/navigation';
import { EmployerRequest } from '../../../types/types';
import styles from './styles';

function EmployerApprovalScreen({
  navigation,
}: AdminSettingsStackScreenProps<'EmployerApprovalScreen'>): ReactElement {

  const employerRequests = useFirestoreListener<EmployerRequest>({
    collection: 'employerRequests',
  });

  return (    
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
          marginTop: '8%'
        }}
      >
        {employerRequests.map(request => (
          <EmployerRequestCard key={request.phoneNumber} employerRequest={request} />
        ))}
      </ScrollView>
    </View>
  );
}

export default EmployerApprovalScreen;
