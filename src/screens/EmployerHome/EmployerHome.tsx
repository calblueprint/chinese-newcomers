import React, { useEffect, useState, useContext } from 'react';
import useFirestoreListener from 'react-firestore-listener';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { query } from 'firebase/firestore';
import { getAllCreatedJobs } from '../../firebase/firestore/employer';
import Logo from '../../assets/cnsc-logo.png';
import JobCard from '../../components/JobCard/JobCard';
import { EmployerStackScreenProps } from '../../types/navigation';
import { Job } from '../../types/types';
import styles from './Styles';
import StyledButton from '../../components/StyledButton/StyledButton';
import { AuthContext } from '../../context/AuthContext';

function EmployerHome({
  navigation,
}: EmployerStackScreenProps<'EmployerHome'>) {
  // const approvedJobs = useFirestoreListener<Job>({
  //   collection: "approvedJobs",
  // });
  // const notApprovedJobs = useFirestoreListener<Job>({
  //   collection: "notApprovedJobs",
  // });
  const [jobs, setJobs] = useState([] as Job[]);
  const [filteredJobs, setFilteredJobs] = useState([] as Job[]);
  const [activeFilter, setActiveFilter] = useState('all');
  const { userObject } = useContext(AuthContext);
  // Screen shows all jobs by default
  useEffect(() => {
    const fetchCreatedJobs = async () => {
      if (userObject === null) {
        console.log('No user found.');
      } else {
        // console.log(userObject);
        const data = await getAllCreatedJobs(userObject.id);
        console.log('getting data');
        console.log(data);
        setJobs(data);
        setFilteredJobs(data);

      }
    };
    console.log('fetching created jobs');
    fetchCreatedJobs();
    setActiveFilter('all');
  }, [userObject, userObject?.id]);

  useEffect(() => {
    // const allJobs = filteredJobs;
    const notApprovedJobs = jobs.filter(job => !job.approved);
    const approvedJobs = jobs.filter(job => job.approved);

    if (activeFilter === 'all') {
      setFilteredJobs(jobs);
    } else if (activeFilter === 'pending') {
      setFilteredJobs(notApprovedJobs);
    } else {
      setFilteredJobs(approvedJobs);
    }
  }, [activeFilter, userObject?.createdJobs]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
        <Text style={styles.employerTitle}>Jobs</Text>
      </View>
      <View style={styles.buttonContainer}>
          <StyledButton
            text="All"
            buttonStyle={
              activeFilter === 'all'
                ? styles.activeButton
                : styles.inactiveButton
            }
            textStyle={
              activeFilter === 'all' ? styles.activeText : styles.inactiveText
            }
            onPress={() => setActiveFilter('all')}
          />
          <StyledButton
            text="Pending"
            buttonStyle={
              activeFilter === 'pending'
                ? styles.activeButton
                : styles.inactiveButton
            }
            textStyle={
              activeFilter === 'pending'
                ? styles.activeText
                : styles.inactiveText
            }
            onPress={() => setActiveFilter('pending')}
          />
          <StyledButton
            text="Approved"
            buttonStyle={
              activeFilter === 'approved'
                ? styles.activeButton
                : styles.inactiveButton
            }
            textStyle={
              activeFilter === 'approved'
                ? styles.activeText
                : styles.inactiveText
            }
            onPress={() => setActiveFilter('approved')}
          />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
          // marginRight: 10,
        }}
      >
        {/* Making filter buttons */}
        
        {filteredJobs.map(job => (
          <JobCard 
          job={job} 
          key={job.id} 
          pending 
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
export default EmployerHome;
