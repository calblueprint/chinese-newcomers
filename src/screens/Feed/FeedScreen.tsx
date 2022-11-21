import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { Button, SearchBar } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { createJob, getAllJobs, deleteJob, getJob } from '../../firebase/firestore/job';
import { Job } from '../../types/types';
import Logo from '../../assets/cnsc-logo.png';
import Fuse from 'fuse.js';

const auth = getAuth();

const FeedScreen = ({ navigation }: any) => {
  const [list, setList] = useState([] as Job[]);
  const [search, setSearch] = useState('');
  const [indexedJobs, setIndexedJobs] = useState(null as unknown as Fuse<Job>);
  const [cachedJobs, setCachedJobs] = useState([] as Job[]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs();
      setList(data);
      const fuse = new Fuse(data, {
        keys: ['id', 'date', 'companyName', 'jobPosition', 'languageRequirement']
      });
      // Note: this is redundant, but in the future if we want to have search by options,
      // this will be needed to conditionally choose the fuse keys
      setIndexedJobs(fuse as Fuse<Job>);
      setCachedJobs(data);
    };
    void fetchJobs();
  }, []);

  const updateSearch = (search: string) => {
    setSearch(search);
    if (search === '') {
      setList([...cachedJobs]);
    } else {
      const result = indexedJobs.search(search);
      setList(result.map((ar) => ar.item));
    }
  };

  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <View style={styles.feedHeader}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
        {/* <View style={styles.redSquare}></View> */}
        <Text style={styles.feedTitle}>Welcome!</Text>
      </View>
      <SearchBar lightTheme={true} onChangeText={updateSearch} value={search} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%'
        }}>
        {list.length === 0 ? (
          <Text>No jobs found</Text>
        ) : (
          list.map((job) => {
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
                otherInfo={job.otherInfo}
                liked={job.liked}></JobCard>
            );
          })
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Back" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

export default FeedScreen;
