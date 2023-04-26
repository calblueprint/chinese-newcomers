import React, { useEffect, useState } from "react"; 
import useFirestoreListener from "react-firestore-listener";
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity, GestureResponderEvent, ViewStyle, TextStyle } from "react-native";
import Logo from "../../assets/cnsc-logo.png";
import JobCard from "../../components/JobCard/JobCard";
import { FeedStackScreenProps } from "../../types/navigation";
import { Job } from "../../types/types";
import styles from "../Drafting/styles";
import StyledButton from "../../components/StyledButton/StyledButton";

function EmployerHome({ navigation }: FeedStackScreenProps<‘EmployerHome’>) {
  const [open, setOpen] = useState(false);
  const approvedJobs = useFirestoreListener<Job>({
    collection: "approvedJobs",
  });
  const notApprovedJobs = useFirestoreListener<Job>({
    collection: "notApprovedJobs",
  });
  const [filteredJobs, setFilteredJobs] = useState([] as Job[]);
  const [toggleFilter, setToggleFilter] = useState("all");
//   const filters: string[] = [‘all’, ‘pending’, ‘approved’];
  const [activeFilter, setActiveFilter] = useState("all");
  const allJobs = approvedJobs.concat(notApprovedJobs);

  // Write filter button logic
  useEffect(() => {
    if (toggleFilter === "all") {
      setFilteredJobs(allJobs);
    } else if (toggleFilter === "pending") {
      setFilteredJobs(notApprovedJobs);
    } else {
      setFilteredJobs(approvedJobs);
    }
  }, [allJobs, notApprovedJobs, approvedJobs]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
        <Text style={styles.feedTitle}>Jobs</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: ‘center’,
          width: ’100%’,
        }}
      >
        {/* Making filter buttons */}
        <View style={styles.buttonContainer}>
          <StyledButton
            text=“All”
            buttonStyle={
              activeFilter === ‘all’
                ? [styles.activeButton, styles.buttonContainer]
                : [styles.inactiveButton, styles.buttonContainer]
            }
            textStyle={
              activeFilter === ‘all’ ? styles.activeText : styles.inactiveText
            }
            onPress={() => setActiveFilter(‘all’)}
          />
          <StyledButton
            text="Pending"
            buttonStyle={
              activeFilter === "pending"
                ? [styles.activeButton, styles.buttonContainer]
                : [styles.inactiveButton, styles.buttonContainer]
            }
            textStyle={
              activeFilter === "pending"
                ? styles.activeText
                : styles.inactiveText
            }
            onPress={() => setActiveFilter("pending")}
          />
          <StyledButton
            text=“Approved”
            buttonStyle={
              activeFilter === ‘approved’
                ? [styles.activeButton, styles.buttonContainer]
                : [styles.inactiveButton, styles.buttonContainer]
            }
            textStyle={
              activeFilter === ‘approved’
                ? styles.activeText
                : styles.inactiveText
            }
            onPress={() => setActiveFilter(‘approved’)}
          />
        </View>
        {filteredJobs.map(job => (
          <JobCard
            job={job}
            key={job.id}
            //   pending={false}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
export default EmployerHome;