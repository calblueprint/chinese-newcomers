import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import { useIsFocused } from '@react-navigation/native';
import JobCard from '../../components/JobCard/JobCard';
import styles from './Styles';
import theme from '../../styles/theme';
import { getAllJobs } from '../../firebase/firestore/job';
import { Job } from '../../types/types';
import Logo from '../../assets/cnsc-logo.png';

const auth = getAuth();

function FeedScreen({ navigation }: any) {
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
    'other',
  ];

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs('approvedJobs');
      setList(data);
      setFilteredList(data);
    };
    fetchJobs();
  }, [isFocused]);

  useEffect(() => {
    if (category === 'all') {
      setFilteredList(list);
    } else {
      setFilteredList(list.filter(job => job.category === category));
    }
  }, [category, list]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
        <Text style={theme.textVariants.h2}>Welcome!</Text>
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

        {filteredList.map((job, index) => (
          // eslint-disable-next-line react/jsx-key
          <JobCard job={job} idx={index} pending={false} filteredJobs={filteredList} setFilteredJobs={setFilteredList} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FeedScreen;
