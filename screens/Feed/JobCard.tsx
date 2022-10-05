import { Text, View, Pressable, Modal } from "react-native";
import styles from './CardStyles'
import React, {useState} from "react";

const JobCard = ({title, description}:{title: string; description: string}) => {
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
            <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.cardHeader}>
        <Text>{title}</Text>
      </View>
      <View style={styles.description}>
          <Text>{description}</Text>
      </View>
      <View style={styles.cardFooter}>

        <Pressable style={styles.moreInfoButton} onPress={() => {
          setModalVisible(true)}}> 
        <Text >More Inforr</Text> 
        </Pressable>
      </View>
    </View> 
  );}

export default JobCard;
