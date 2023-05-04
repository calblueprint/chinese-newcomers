import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { SetStateAction } from 'react';
import { AuthDispatch } from '../context/AuthContext';
import { checkAndGetLang } from '../translation/languages';
import { Dictionary } from '../types/types';
import firebaseApp from './firebaseApp';
import { activateUser } from './firestore/access';
import {
  checkAndAddUser,
  getBookmarks,
  getUser,
  removeBookmarkedJob,
  updateUser,
} from './firestore/user';

const auth = getAuth(firebaseApp);
// TODO: CHANGE 'recaptcha-container' TO ID OF CAPTCHA CONTAINER
// window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

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
  params: {
    email: string;
    password: string;
    phoneNumber: string;
    userType: string;
    language: string;
  },
) => {
  createUserWithEmailAndPassword(auth, params.email, params.password)
    .then(async userCredential => {
      const { user } = userCredential;
      await checkAndAddUser(
        user,
        params.userType,
        params.phoneNumber,
        params.language,
      );
      console.log('Email sign up successful', user.email);
      await activateUser(params.phoneNumber);
      const UserObject = await getUser(user.uid);
      dispatch({ type: 'SIGN_IN', userObject: UserObject });
    })
    .catch(error => {
      console.warn('Email sign up error', error);
    });
};

export const signInEmail = async (
  dispatch: AuthDispatch,
  langUpdate: React.Dispatch<SetStateAction<Dictionary>>,
  params: { email: string; password: string; language: string },
) => {
  signInWithEmailAndPassword(auth, params.email, params.password)
    .then(async userCredential => {
      const { user } = userCredential;
      console.log('Email sign in successful', user.email);
      const UserObject = await getUser(user.uid);
      console.log(UserObject);
      if (UserObject) {
        console.log(params.language);
        const map: Map<string, string> = new Map([
          ['language', params.language],
        ]);
        await updateUser(UserObject.id, map, UserObject.access);
        UserObject.language = params.language;
        langUpdate(checkAndGetLang(params.language));
        console.log(UserObject);
      }
      dispatch({ type: 'SIGN_IN', userObject: UserObject });
    })
    .catch(error => {
      console.warn('Email sign in error', error);
    });
};

export const signInPhone = async (
  dispatch: AuthDispatch,
  langUpdate: React.Dispatch<SetStateAction<Dictionary>>,
  params: {
    verificationId: string;
    verificationCode: string;
    language: string;
  },
) => {
  try {
    const credential = await PhoneAuthProvider.credential(
      params.verificationId,
      params.verificationCode,
    );
    const result = await signInWithCredential(auth, credential);
    await checkAndAddUser(result.user, 'regularUser', null, params.language);
    langUpdate(checkAndGetLang(params.language));
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

export const updateLanguage = async (
  dispatch: AuthDispatch,
  langUpdate: React.Dispatch<React.SetStateAction<Dictionary>>,
  params: { language: string },
) => {
  if (auth.currentUser) {
    const user = await getUser(auth.currentUser.uid);
    if (user) {
      const map: Map<string, string> = new Map([['language', params.language]]);
      await updateUser(user.id, map, user.access);
      langUpdate(checkAndGetLang(params.language));
      dispatch({ type: 'UPDATE_LANGUAGE', language: params.language });
    }
  }
};
