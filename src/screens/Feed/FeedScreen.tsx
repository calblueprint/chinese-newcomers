import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Logo from '../../assets/cnsc-logo.png';
import JobCard from '../../components/JobCard/JobCard';
import { getAllJobs } from '../../firebase/firestore/job';
import { getUser } from '../../firebase/firestore/user';
import { FeedStackScreenProps } from '../../types/navigation';
import { Job } from '../../types/types';
import styles from './Styles';

function FeedScreen({ navigation }: FeedStackScreenProps<'FeedScreen'>) {
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

  // debugging user functions
  // console.log("hello");
  // console.log(getUser("GhifKnsELfgFWy2b2bhw"));
  // console.log("hello")

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

        {filteredList.map((job, index) => (
          // eslint-disable-next-line react/jsx-key
          <JobCard
            job={job}
            key={job.id}
            idx={index}
            pending={false}
            pendingJobs={null}
            setPendingJobs={null}
            filteredJobs={filteredList}
            setFilteredJobs={setFilteredList}
          />
        ))}
      </ScrollView>
      {/* <View style={styles.footer}>
        <Button title="Back" onPress={() => navigation.navigate('Home')} />
      </View> */}
    </SafeAreaView>
  );
}

export default FeedScreen;
