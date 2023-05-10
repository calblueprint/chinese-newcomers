import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getAllCreatedJobs } from '../../firebase/firestore/employer';
import JobCard from '../../components/JobCard/JobCard';
import { EmployerStackScreenProps } from '../../types/navigation';
import { Employer, Job } from '../../types/types';
import styles from './styles';
import StyledButton from '../../components/StyledButton/StyledButton';
import { AuthContext } from '../../context/AuthContext';

function EmployerHome({
  navigation,
}: EmployerStackScreenProps<'EmployerHome'>) {
  const [jobs, setJobs] = useState([] as Job[]);
  const [filteredJobs, setFilteredJobs] = useState([] as Job[]);
  const [activeFilter, setActiveFilter] = useState('all');
  const { userObject } = useContext(AuthContext);
  const employerObject = userObject as Employer;
  // Screen shows all jobs by default
  useEffect(() => {
    const fetchCreatedJobs = async () => {
      if (userObject === null) {
        console.log('No user found.');
      } else {
        const data = await getAllCreatedJobs(userObject.id);
        setJobs(data);
        setFilteredJobs(data);
      }
    };
    fetchCreatedJobs();
    setActiveFilter('all');
  }, [userObject, userObject?.id]);

  useEffect(() => {
    const notApprovedJobs = jobs.filter(job => !job.approved);
    const approvedJobs = jobs.filter(job => job.approved);

    if (activeFilter === 'all') {
      setFilteredJobs(jobs);
    } else if (activeFilter === 'pending') {
      setFilteredJobs(notApprovedJobs);
    } else {
      setFilteredJobs(approvedJobs);
    }
  }, [activeFilter, employerObject?.createdJobs, jobs]);

  return (
    <SafeAreaView style={styles.container}>
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
        }}
      >
        {/* Making filter buttons */}
        
        {filteredJobs.map(job => (
          <JobCard 
            job={job} 
            key={job.id} 
            pending={false}
            bookmarkedJobs={null}
            setBookmarkedJobs={null}
          />
        ))}
        {filteredJobs.length === 0 && (
          <Text style={{ marginTop: '10%' }}>
            No jobs here!
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default EmployerHome;