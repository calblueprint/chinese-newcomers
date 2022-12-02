import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { createJob, getAllJobs, deleteJob, getJob } from '../../firebase/firestore/job';
import { Job } from '../../types/types';
import Logo from '../../assets/cnsc-logo.png';

const auth = getAuth();

const FeedScreen = ({ navigation }: any) => {
  const [list, setList] = useState([] as Job[]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs();
      setList(data);
    };
    void fetchJobs();
  }, []);

  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <View style={styles.feedHeader}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
        <Text style={styles.feedTitle}>Welcome!</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%'
        }}>
        {list.map((job, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <JobCard
              key={index}
              id={job.id}
              date={job.date}
              companyName={job.companyName}
              address={job.address}
              contactPerson={job.contactPerson}
              phone={job.phone}
              jobPosition={job.jobPosition}
              languageRequirement={job.languageRequirement}
              workingHours={job.workingHours}
              workingDays={job.workingDays}
              salary={job.salary}
              probationPeriod={job.probationPeriod}
              employeeBenefit={job.employeeBenefit}
              otherInfo={job.otherInfo}
              liked={job.liked}
              visible={job.visible}></JobCard>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Back" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

export default FeedScreen;
