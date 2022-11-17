import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getUser, addUser } from '../firebase/firestore/user';

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

export const registerWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
    const userObject = await getUser(user.uid);
    if (userObject !== null) {
      console.log('Got user from users collection. Name: ' + userObject.name);
      // TODO: probably put user object into react context
    } else {
      console.log('Create new user flow');
      // TODO: handle user not yet in users collection. check access collection to see what type of user to create
      // below code just for testing
      await addUser({
        id: user.uid,
        access: 'admin',
        createdJobs: [],
        email: user.email,
        likedJobs: [], // switched to string of jobIds to match Firebase
        name: 'test phone',
        phoneNumber: user.phoneNumber,
        verified: true,
        password: null
      });
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};
