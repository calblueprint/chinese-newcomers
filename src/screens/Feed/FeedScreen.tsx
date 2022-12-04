import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { createJob, getAllJobs, deleteJob, getJob } from '../../firebase/firestore/job';
import { Job } from '../../types/types';
import DropDownPicker from 'react-native-dropdown-picker';
import Logo from '../../assets/cnsc-logo.png';

const auth = getAuth();

const FeedScreen = ({ navigation }: any) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([] as Job[]);
  const [filteredList, setFilteredList] = useState([] as Job[]);
  const [category, setCategory] = useState('all');
  const categories: string[] = [
    'all',
    'factory',
    'caretaker',
    'restaurant',
    'construction',
    'sales',
    'driver',
    'education',
    'finance',
    'management',
    'IT',
    'other'
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs();
      setList(data);
      setFilteredList(data);
    };
    void fetchJobs();
  }, []);

  useEffect(() => {
    if (category === 'all') {
      setFilteredList(list);
    } else {
      setFilteredList(list.filter((job) => job.category === category));
    }
  }, [category]);

  const { user } = useAuthentication();
  return (
    <SafeAreaView style={styles.container}>
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
        <DropDownPicker
          open={open}
          value={category}
          items={categories.map((category) => ({ label: category, value: category }))}
          setOpen={setOpen}
          setValue={setCategory}
          listMode="SCROLLVIEW"
        />
        {filteredList.map((job) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <JobCard
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
              category={job.category}
              otherInfo={job.otherInfo}
              liked={job.liked}
              visible={job.visible}></JobCard>
          );
        })}
      </ScrollView>
      {/* <View style={styles.footer}>
        <Button title="Back" onPress={() => navigation.navigate('Home')} />
      </View> */}
    </SafeAreaView>
  );
};

export default FeedScreen;
