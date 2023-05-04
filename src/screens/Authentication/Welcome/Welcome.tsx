import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import React, { useContext, useRef } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import logo from '../../../assets/cnsc-logo.png';
import { AuthContext } from '../../../context/AuthContext';
import { firebaseApp } from '../../../firebase/firebaseApp';
import { checkAndGetLang } from '../../../translation/languages';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function WelcomeScreen({ navigation }: AuthStackScreenProps<'WelcomeScreen'>) {
  const recaptchaVerifier = useRef(null);

  const [langModalVisibile, setLangModalVisible] = React.useState(true);
  const { langUpdate } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subText}>
          Chinese Newcomers Service Center Job Portal
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.welcomeButtons}
          onPress={() => navigation.navigate('UserTypeScreen')}
        >
          <Text style={styles.welcomeButtonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.welcomeButtons, { backgroundColor: '#fff' }]}
          onPress={() => navigation.navigate('SigninScreen')}
        >
          <Text style={[styles.welcomeButtonText, { color: '#D82D1F' }]}>
            LOG IN
          </Text>
        </TouchableOpacity>
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseApp.options}
      />
      <Modal visible={langModalVisibile} transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalChooseLang}>Select Language</Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButtons}
                onPress={() => {
                  setLangModalVisible(false);
                  langUpdate(checkAndGetLang('english'));
                }}
              >
                <Text style={styles.modalButtonsText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtons}
                onPress={() => {
                  setLangModalVisible(false);
                  langUpdate(checkAndGetLang('chinese'));
                }}
              >
                <Text style={styles.modalButtonsText}>中文</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default WelcomeScreen;
