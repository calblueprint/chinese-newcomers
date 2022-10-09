import { Text, View, Pressable, Modal } from "react-native";
import styles from './CardStyles'
import React, {useState} from "react";

const JobCard = ({title, description, employer, hours, salary, contact}:{title: string; description: string}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.cardContainer}>

    <Modal
        transparent={true}
        visible={modalVisible}
        animationType = "slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.modalInfo}>
              <Text style={styles.modalText}>employer: {employer}</Text>
              <Text style={styles.modalText}>hours: {hours}</Text>
              <Text style={styles.modalText}>salary: {salary}</Text>
              <Text style={styles.modalText}>{description}</Text>
              <Text style={styles.modalText}>contact: {contact}</Text>
            </View>
            <Pressable
            style={styles.hideButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>x</Text>
          </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.cardHeader}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.description}>
          <Text style = {styles.descriptionText}>{description}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Pressable style={styles.moreInfoButton} onPress={() => {
          setModalVisible(true)}}> 
        <Text >More Info</Text> 
        </Pressable>
      </View>
    </View> 
  );}

export default JobCard;
