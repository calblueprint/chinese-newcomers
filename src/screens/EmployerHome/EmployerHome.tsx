import React, { useEffect, useState, useContext } from "react"; 
import useFirestoreListener from "react-firestore-listener";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Logo from "../../assets/cnsc-logo.png";
import JobCard from "../../components/JobCard/JobCard";
import { EmployerStackScreenProps } from "../../types/navigation";
import { Job } from "../../types/types";
import styles from "./Styles";
import StyledButton from "../../components/StyledButton/StyledButton";
import { AuthContext } from "../../context/AuthContext";
import { getAllCreatedJobs } from "firebase/firestore/employer";

function EmployerHome({ navigation }: EmployerStackScreenProps<'EmployerHome'>) {
  // const approvedJobs = useFirestoreListener<Job>({
  //   collection: "approvedJobs",
  // });
  // const notApprovedJobs = useFirestoreListener<Job>({
  //   collection: "notApprovedJobs",
  // });
  const [filteredJobs, setFilteredJobs] = useState([] as Job[]);
  const [activeFilter, setActiveFilter] = useState("all");
  const { userObject } = useContext(AuthContext);
  // const allJobs = approvedJobs.concat(notApprovedJobs);

  // Write filter button logic
 useEffect(() => {
  const fetchCreatedJobs = async () => {
    const data = await getAllCreatedJobs(userObject?.id);
      setFilteredJobs(data);
  };
  fetchCreatedJobs();
 }, [userObject, userObject?.id]);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredJobs(allJobs);
    } else if (activeFilter === "pending") {
      setFilteredJobs(notApprovedJobs);
    } else {
      setFilteredJobs(approvedJobs);
    } 
  }, [activeFilter, allJobs, notApprovedJobs, approvedJobs]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <Image source={Logo} style={{ width: 100, height: 100 }} />
        <Text style={styles.employerTitle}>Jobs</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          width: "100%",
        }}
        >
        {/* Making filter buttons */}
        <View style={styles.buttonContainer}>
          <StyledButton
            text="All"
            buttonStyle={
              activeFilter === "all"
                ? [styles.activeButton, styles.buttonContainer]
                : [styles.inactiveButton, styles.buttonContainer]
            }
            textStyle={
              activeFilter === "all" ? styles.activeText : styles.inactiveText
            }
            onPress={() => setActiveFilter("all")}
          />
          <StyledButton
            text="Pending"
            buttonStyle={
              activeFilter === "pending"
                ? [styles.activeButton, styles.buttonContainer]
                : [styles.inactiveButton, styles.buttonContainer]
            }
            textStyle={
              activeFilter === "pending" ? styles.activeText : styles.inactiveText
            }
            onPress={() => setActiveFilter("pending")}
          />
          <StyledButton
            text="Approved"
            buttonStyle={
              activeFilter === "approved"
                ? [styles.activeButton, styles.buttonContainer]
                : [styles.inactiveButton, styles.buttonContainer]
            }
            textStyle={
              activeFilter === "approved" ? styles.activeText : styles.inactiveText
            }
            onPress={() => setActiveFilter("approved")}
          />
        </View>
        {filteredJobs.map(job => (
          <JobCard
            job={job}
            key={job.id}
            pending={false}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
export default EmployerHome;