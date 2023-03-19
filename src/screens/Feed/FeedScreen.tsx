import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useIsFocused } from '@react-navigation/native';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import { getAllJobs } from '../../firebase/firestore/job';
import { Job } from '../../types/types';
import Logo from '../../assets/cnsc-logo.png';
import { FeedStackScreenProps } from '../../types/navigation';

function FeedScreen({ navigation }: FeedStackScreenProps<'FeedScreen'>) {
  const [open, setOpen] = useState(false);
  const [approvedJobs, setApprovedJobs] = useState([] as Job[]);
  const [filteredApprovedJobs, setFilteredApprovedJobs] = useState([] as Job[]);
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
    'other',
  ];

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs('approvedJobs');
      setApprovedJobs(data);
      setFilteredApprovedJobs(data);
    };
    fetchJobs();
  }, [isFocused]);

  useEffect(() => {
    if (category === 'all') {
      setFilteredApprovedJobs(approvedJobs);
    } else {
      setFilteredApprovedJobs(approvedJobs.filter(job => job.category === category));
    }
  }, [category, approvedJobs]);

  const filterApprovedJobs = useCallback((idx: number) => {
    setApprovedJobs(list => list.filter((_, index) => index !== idx))
  }, []);

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
          width: '100%',
        }}
      >
        <Text style={styles.categoryText}> Filter By Category: </Text>

        <DropDownPicker
          open={open}
          value={category}
          items={categories.map(c => ({ label: c, value: c }))}
          setOpen={setOpen}
          setValue={setCategory}
          listMode="SCROLLVIEW"
          containerStyle={{ width: '85%', marginBottom: '8%' }}
          textStyle={{ fontFamily: 'DMSans_500Medium' }}
        />

        {filteredApprovedJobs.map((job, index) => (
          <JobCard key={job.id} job={job} idx={index} isPending={false} onRemove={filterApprovedJobs} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FeedScreen;
