import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import React, { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native-paper';
import logo from '../../../assets/cnsc-logo.png';
import { firebaseApp } from '../../../firebase/firebaseApp';
import '../../../translation/languages';
import { AuthStackScreenProps } from '../../../types/navigation';
import styles from './styles';

function WelcomeScreen({ navigation }: AuthStackScreenProps<'WelcomeScreen'>) {
  const recaptchaVerifier = useRef(null);

  const [langModalVisibile, setLangModalVisible] = React.useState(true);

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
        <StyledButton
          text={t('welcomePage.signUp')}
          onPress={() => navigation.navigate('UserTypeScreen')}
          buttonStyle={{}}
          textStyle={{}}
        />

        <Text style={styles.orText}> {t('welcomePage.or')} </Text>

        <StyledButton
          text={t('welcomePage.signIn')}
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
      <Modal visible={langModalVisibile}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalChooseLang}>Select Language</Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButtons}
                onPress={() => setLangModalVisible(false)}
              >
                <Text style={styles.modalButtonsText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtons}
                onPress={() => {
                  setLangModalVisible(false);
                  // TODO: call updateLanguage
                  // updateLanguage(dispatch, )
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
