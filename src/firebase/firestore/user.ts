import { UserCredential } from 'firebase/auth';
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { User, Job } from '../../types/types';
import { db } from '../config';
import { getJob } from './job';

const parseUser = async (document: QueryDocumentSnapshot<DocumentData>) => {
  const userId = document.id.toString();
  const data = document.data();
  const user = {
    id: userId,
    access: data.access,
    createdJobs: data.createdJobs, // might need to map to job objects later
    email: data.email,
    likedJobs: data.likedJobs, // might need to map to job objects later
    name: data.name,
    phoneNumber: data.phoneNumber,
    verified: data.verified,
    password: data.password,
  };
  return user as User;
};

export const getUser = async (id: string): Promise<User | null> => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return parseUser(docSnap);
  }
  // doc.data() will be undefined in this case
  console.log('No such document!');
  return null;
};

export const addUser = async (user: User): Promise<void> => {
  const itemsRef = doc(db, 'users', user.id);
  await setDoc(itemsRef, user);
};

export const updateUser = async (
  userId: string,
  newLikedJobs: string[],
): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  // This data object changes the fields that are different from the entry in backend!
  const data = {
    point_gain: newLikedJobs,
  };
  await updateDoc(docRef, data);
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
    console.log(`Got user from users collection. Name: ${userObject.name}`);
  } else {
    console.log('Create new user flow');
    let assignPhoneNumber = null;
    if (user.phoneNumber) {
      assignPhoneNumber = user.phoneNumber;
    } else if (phoneNumber) {
      assignPhoneNumber = phoneNumber;
    }

    await addUser({
      id: user.uid,
      access: accessLevel,
      createdJobs: [],
      email: user.email ? user.email : null,
      likedJobs: [], // switched to string of jobIds to match Firebase
      name: 'test phone',
      phoneNumber: assignPhoneNumber,
      verified: true,
    });
  }
};

export const updateBookmarks = async (
  jobId: string,
  userId: string,
): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  const data = jobId;
  const docSnap = await getDoc(docRef);
  if (docSnap === undefined) {
    return;
  }
  if (docSnap.data().likedJobs.includes(jobId)) {
    await updateDoc(docRef, { likedJobs: arrayRemove(data) });
  } else {
    await updateDoc(docRef, { likedJobs: arrayUnion(data) });
  }
};

export const updateUserBookmarks = async (
  userLikedJobs: string[] | undefined,
  userId: string,
): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  updateDoc(docRef, { likedJobs: userLikedJobs });
};

export const getBookmarks = (
  jobId: string,
  userObject: User | null,
): boolean => {
  if (userObject?.likedJobs.includes(jobId)) {
    return true;
  }
  return false;
};

export const getAllBookmarks = async (
  userObject: User | null,
): Promise<Job[]> => {
  try {
    const promises: Array<Promise<Job>> = [];
    userObject?.likedJobs.forEach(job => {
      promises.push(getJob(job, 'approvedJobs'));
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
