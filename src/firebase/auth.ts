import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  User,
} from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getUser, addUser } from './firestore/user';
import { db } from './config';
import firebaseApp from './firebaseApp';

const auth = getAuth(firebaseApp);
// TODO: CHANGE 'recaptcha-container' TO ID OF CAPTCHA CONTAINER
// window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

export const getAccess = async (id: string): Promise<boolean> => {
  const docRef = doc(db, 'access', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('Admin access');
    return true;
  }
  console.log('not admin');
  return false;
};

export const activatedAdmin = async (phoneNumber: string): Promise<void> => {
  const docRef = doc(db, 'access', phoneNumber);
  const data = {
    activated: true,
  };
  await updateDoc(docRef, data);
};

export const getActivationStatus = async (
  phoneNumber: string,
): Promise<boolean> => {
  const docRef = doc(db, 'access', phoneNumber);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    if (docSnap.data().activated) {
      console.log(
        'You are an activated admin user. Please sign in as an admin.',
      );
      return true;
    }
    console.log('Admin not activated.');
    return false;
  }
  console.log('Not admin');
  return false;
};

// Part 1 of signing in with phone. Returns verificationId
export const phoneGetConfirmation = async (
  phoneNumber: string,
  appVerifier: any,
) => {
  try {
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      appVerifier.current,
    );
    return verificationId;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// Part 2 of signing in with phone. Confirm code using ConfirmationResult. Returns user
export const confirmCode = async (verificationId: string, code: string) => {
  try {
    const credential = await PhoneAuthProvider.credential(verificationId, code);
    const result = await signInWithCredential(auth, credential);
    return result.user;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = userCredential;
    console.log(user);
    const userObject = await getUser(user.uid);
    if (userObject !== null) {
      console.log(`Got user from users collection. Name: ${userObject.name}`);
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
      });
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const logInOrRegisterWithPhoneNumber = async (
  user: any,
): Promise<void> => {
  try {
    const userObject = await getUser(user.id);
    if (userObject !== null) {
      console.log(`Got user from users collection. Name: ${userObject.name}`);
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
        // password: null
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUpPhoneAdmin = async (
  verficationId: string,
  code: string,
): Promise<void> => {
  try {
    const credential = await PhoneAuthProvider.credential(verficationId, code);
    const result = await signInWithCredential(auth, credential);
    console.log('Phone authentication successful', result.user.phoneNumber);
    const user = auth.currentUser;
    if (user == null) {
      console.warn('null user error'); // TODO: handle null user case
    }
    deleteUser(user as User)
      .then(() => {
        console.log('User successfully deleted');
      })
      .catch(error => {
        console.log('Error deleting user', error);
      });
  } catch (error) {
    console.warn('Phone sign up error', error);
    throw error;
  }
};
