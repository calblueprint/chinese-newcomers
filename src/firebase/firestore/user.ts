import { UserCredential } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Admin, Employer, Job, RegularUser } from '../../types/types';
import { db } from '../config';
import { getJob } from './job';
import { ADMIN_COLLECTION, APPROVED_JOBS_COLLECTION, EMPLOYER_COLLECTION, REGULAR_USER_COLLECTION } from './constants';

const collectionNames: string[] = [
  ADMIN_COLLECTION,
  REGULAR_USER_COLLECTION,
  EMPLOYER_COLLECTION,
];

const userCollectionRefs = (id: string) => [
  doc(db, REGULAR_USER_COLLECTION, id),
  doc(db, ADMIN_COLLECTION, id),
  doc(db, EMPLOYER_COLLECTION, id),
];

const parseUser = async (document: DocumentSnapshot<DocumentData>) => {
  const userId = document.id.toString();
  const data = document.data();
  const type = data?.access;
  const user = {
    id: userId,
    ...data,
  };
  if (type === 'admin') {
    return user as Admin;
  }
  if (type === REGULAR_USER_COLLECTION) {
    return user as RegularUser;
  }
  return user as Employer;
};

export const getUser = async (id: string): Promise<RegularUser | null> => {
  const collections = userCollectionRefs(id);
  const docSnaps = await Promise.all(collections.map(c => getDoc(c)));
  const docSnap = docSnaps.find(document => document.exists());
  if (docSnap) {
    return parseUser(docSnap);
  }
  return null;
};

export const addUser = async (user: RegularUser): Promise<void> => {
  const type = user.access;
  const itemsRef = doc(db, type, user.id);
  await setDoc(itemsRef, user);
};

export const updateUser = async (
  userId: string,
  newFields: Map<string, string | string[] | boolean>,
  userType: string,
) => {
  const docRef = doc(db, userType, userId);
  await updateDoc(docRef, Object.fromEntries(newFields));
};

const attemptDeleteUserFromCollection = async (
  phoneNumber: string,
  collectionName: string,
): Promise<void> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach(async document => {
    if (document.exists()) {
      if (document.data().phoneNumber === phoneNumber) {
        await deleteDoc(document.ref);
      }
    }
  });
};

export const deleteUserFromFirestore = async (
  phoneNumber: string,
): Promise<void> => {
  collectionNames.map(col => attemptDeleteUserFromCollection(phoneNumber, col));
};

export const deleteUser = async (userId: string): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  await deleteDoc(docRef);
};

export const checkAndAddUser = async (
  user: UserCredential['user'],
  accessLevel: string,
  phoneNumber: string | null,
) => {
  const userObject = await getUser(user.uid);
  if (userObject !== null) {
    console.log('Got user from users collection');
  } else {
    console.log('Create new user flow');
    let assignPhoneNumber = null;
    if (user.phoneNumber) {
      assignPhoneNumber = user.phoneNumber;
    } else if (phoneNumber) {
      assignPhoneNumber = phoneNumber;
    }

    //  might need to fix this depending on different types
    await addUser({
      id: user.uid,
      access: accessLevel,
      createdJobs: [],
      email: user.email ? user.email : null,
      bookmarkedJobs: [], // switched to string of jobIds to match Firebase
      name: 'test phone',
      phoneNumber: assignPhoneNumber,
      verified: true,
    });
  }
};

export const updateUserBookmarks = async (
  userBookmarkedJobs: string[] | undefined,
  userId: string,
  accessLevel: string,
): Promise<void> => {
  try {
    const docRef = doc(db, accessLevel, userId);
    updateDoc(docRef, { bookmarkedJobs: userBookmarkedJobs });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const removeBookmarkedJob = async (
  jobId: string,
  userBookmarkedJobs: string[] | undefined,
): Promise<void> => {
  try {
    if (userBookmarkedJobs !== undefined) {
      const index = userBookmarkedJobs?.indexOf(jobId);
      userBookmarkedJobs?.splice(index, 1);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getBookmarks = (
  jobId: string,
  userBookmarkedJobs: string[] | undefined,
): boolean => {
  if (userBookmarkedJobs?.includes(jobId)) {
    return true;
  }
  return false;
};

export const getBookmarkedJobs = async (
  userBookmarkedJobs: string[] | undefined,
): Promise<Job[]> => {
  try {
    const promises: Array<Promise<Job>> = [];
    userBookmarkedJobs?.forEach(job => {
      promises.push(getJob(job, APPROVED_JOBS_COLLECTION));
    });
    const allJobs = await Promise.all(promises);
    return allJobs.filter(obj =>
      Object.prototype.hasOwnProperty.call(obj, 'jobPosition'),
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};
