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
import { User } from '../../types/types';
import { db } from '../config';

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
  console.log('userId', userId);
  const docRef = doc(db, 'users', userId);
  const data = jobId;
  const docSnap = await getDoc(docRef);
  // console.log(docSnap.data());
  if (docSnap === undefined) {
    return;
  }
  if (docSnap.data().likedJobs.includes(jobId)) {
    console.log('likedJobs includes jobid');
    await updateDoc(docRef, { likedJobs: arrayRemove(data) });
  } else {
    console.log('likedJobs doesnt include jobid');
    await updateDoc(docRef, { likedJobs: arrayUnion(data) });
  }
};

export const getBookmarks = async (
  jobId: string,
  userId: string,
): Promise<boolean> => {
  const docRef = doc(db, 'users', userId);
  console.log('im here');
  const docSnap = await getDoc(docRef);
  console.log('liked jobs', docSnap.data().likedJobs);
  console.log(jobId);
  if (docSnap.data().likedJobs.includes(jobId)) {
    console.log('bookmarked!');
    return true;
  }
  return false;
};
