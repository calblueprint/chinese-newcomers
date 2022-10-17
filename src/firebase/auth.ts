import { getAuth, PhoneAuthProvider, signInWithCredential, signOut } from 'firebase/auth';

const auth = getAuth();
// TODO: CHANGE 'recaptcha-container' TO ID OF CAPTCHA CONTAINER
// window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

// Part 1 of signing in with phone. Returns verificationId
export const phoneGetConfirmation = async (phoneNumber: string, appVerifier: any) => {
  try {
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, appVerifier.current);
    return verificationId;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// Part 2 of signing in with phone. Confirm code using ConfirmationResult. Returns user
export const confirmCode = async (verificationId: any, code: any) => {
  try {
    const credential = await PhoneAuthProvider.credential(verificationId, code);
    const result = await signInWithCredential(auth, credential);
    return result.user;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const signOutUser = async () => {
  try {
    const result = await signOut(auth);
    return result;
  } catch (error) {
    console.log(error);
  }
};
