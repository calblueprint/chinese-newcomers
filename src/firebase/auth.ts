import {
  PhoneAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthDispatch } from '../context/AuthContext';
import { db } from './config';
import firebaseApp from './firebaseApp';
import {
  checkAndAddUser,
  getBookmarks,
  getUser,
  removeBookmarkedJob,
} from './firestore/user';

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

export const signUpPhoneAdmin = async (
  verificationId: string,
  code: string,
): Promise<void> => {
  try {
    const credential = await PhoneAuthProvider.credential(verificationId, code);
    const result = await signInWithCredential(auth, credential);
    console.log('Phone authentication successful', result.user.phoneNumber);
    const user = auth.currentUser;
    console.log("IS THIS WORKING PLS")
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

export const changeBookmark = async (
  dispatch: AuthDispatch,
  params: { jobId: string; userBookmarkedJobs: string[] | undefined },
) => {
  if (getBookmarks(params.jobId, params.userBookmarkedJobs)) {
    removeBookmarkedJob(params.jobId, params.userBookmarkedJobs);
  } else {
    params.userBookmarkedJobs?.push(params.jobId);
  }
  dispatch({
    type: 'CHANGE_BOOKMARK',
    bookmarkedArray: params.userBookmarkedJobs,
  });
};

export const signUpEmail = async (
  dispatch: AuthDispatch,
  params: { email: string; password: string; phoneNumber: string },
) => {
  createUserWithEmailAndPassword(auth, params.email, params.password)
    .then(async userCredential => {
      console.log("signup email");
      const { user } = userCredential;
      await checkAndAddUser(user, 'admin', params.phoneNumber);
      console.log('Email sign up successful', user.email);
      await activatedAdmin(params.phoneNumber);
      const UserObject = await getUser(user.uid);
      dispatch({ type: 'SIGN_IN', userObject: UserObject });
    })
    .catch(error => {
      console.warn('Email sign up error', error);
    });
};

export const signInEmail = async (
  dispatch: AuthDispatch,
  params: { email: string; password: string },
) => {
  signInWithEmailAndPassword(auth, params.email, params.password)
    .then(async userCredential => {
      const { user } = userCredential;
      const UserObject = await getUser(user.uid);
      dispatch({ type: 'SIGN_IN', userObject: UserObject });
    })
    .catch(error => {
      console.warn('Email sign in error', error);
    });
};

export const signInPhone = async (
  dispatch: AuthDispatch,
  params: { verificationId: string; verificationCode: string },
) => {
  try {
    const credential = await PhoneAuthProvider.credential(
      params.verificationId,
      params.verificationCode,
    );
    const result = await signInWithCredential(auth, credential);
    await checkAndAddUser(result.user, 'regularUser', null);
    console.log('Phone authentication successful', result.user.phoneNumber);
    const UserObject = await getUser(result.user.uid);
    dispatch({ type: 'SIGN_IN', userObject: UserObject });
  } catch (error) {
    console.warn('Phone sign up error', error);
    throw error;
  }
};

export const signUserOut = async (dispatch: AuthDispatch) => {
  try {
    await signOut(auth);
    console.log('Sign out successful');
  } catch (error) {
    console.warn('Sign out error', error);
  }
  dispatch({ type: 'SIGN_OUT' });
};
