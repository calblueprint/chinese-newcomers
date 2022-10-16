import { db } from '../config';
import 'firebase/firestore';
import { User } from '../../types/types';
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const getUser = async (id: string): Promise<User | null> => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('User data:', docSnap.data());
    return await parseUser(docSnap);
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
    return null;
  }
};

export const addUser = async (user: User): Promise<void> => {
  const itemsRef = doc(db, 'users', user.id);
  await setDoc(itemsRef, user);
};

export const updateUser = async (userId: string, newLikedJobs: string[]): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  // This data object changes the fields that are different from the entry in backend!
  const data = {
    point_gain: newLikedJobs
  };
  await updateDoc(docRef, data);
};

export const deleteUser = async (userId: string): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  await deleteDoc(docRef);
};

const parseUser = async (doc: any) => {
  const user_id = doc.id.toString();
  const data = doc.data();
  const user = {
    id: user_id,
    access: data.access,
    createdJobs: data.createdJobs, //might need to map to job objects later
    email: data.email,
    likedJobs: data.likedJobs, //might need to map to job objects later
    name: data.name,
    phoneNumber: data.phoneNumber,
    verified: data.verified
  };
  return user as User;
};
