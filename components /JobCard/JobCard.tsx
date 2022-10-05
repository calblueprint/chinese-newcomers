import { Text, View, Pressable, Modal, Alert} from "react-native";
import styles from './CardStyles'
import React, {useState, useEffect} from "react";

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
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          console.log("hello")
          setModalVisible(true)}
          }>
        <Text style={styles.textStyle}> Show Modal </Text>
      </Pressable>

      <View style={styles.cardHeader}>
        <Text>{title}</Text>
      </View>
      <View style={styles.description}>
          <Text>{description}</Text>
      </View>
      <View style={styles.cardFooter}>


        <Pressable style={styles.moreInfoButton} onPress={() => {
          console.log("hello")
          setModalVisible(true)}}> 
        <Text >More Inforr</Text> 
        </Pressable>
      </View>
    </View> 
  );
};

export default JobCard;
