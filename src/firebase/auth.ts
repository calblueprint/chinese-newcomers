import { FirebaseApp } from 'firebase/app';
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser
} from 'firebase/auth';
import { getUser, addUser } from '../firebase/firestore/user';
import { db } from '../firebase/config';
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import firebaseApp from './firebaseApp';

const auth = getAuth(firebaseApp);
// TODO: CHANGE 'recaptcha-container' TO ID OF CAPTCHA CONTAINER
// window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

export const getAccess = async (id: string): Promise<User | null> => {
  const docRef = doc(db, 'access', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('Admin access');
    return true;
  } else {
    console.log('not admin');
    return false;
  }
};

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

export const logInOrRegisterWithPhoneNumber = async (user: any): Promise<User> => {
  try {
    const userObject = await getUser(user.id);
    if (userObject !== null) {
      console.log('Got user from users collection. Name: ' + userObject.name);
      // TODO: probably put user object into react context
    } else {
      console.log('Create new user flow');
      // TODO: handle user not yet in users collection. check access collection to see what type of user to create
      // below code just for testing
      await addUser({
        id: user.uid,
        access: 'regular_user',
        createdJobs: [],
        email: user.email,
        likedJobs: [], // switched to string of jobIds to match Firebase
        name: 'test phone',
        phoneNumber: user.phoneNumber,
        verified: true,
        password: null
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUpPhoneAdmin = async (verficationId: any, code: any): Promise<void> => {
  try {
    const credential = await PhoneAuthProvider.credential(verficationId, code);
    const result = await signInWithCredential(auth, credential);
    console.log('Phone authentication successful', result.user.phoneNumber);
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        console.log('User successfully deleted');
      })
      .catch((error) => {
        console.log('Error deleting user', error);
      });
  } catch (error) {
    console.warn('Phone sign up error', error);
    throw error;
  }
};
