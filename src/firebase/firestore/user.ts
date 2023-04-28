import { UserCredential } from 'firebase/auth';
import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  DocumentSnapshot,
  setDoc,
  updateDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db } from '../config';
import { RegularUser, Admin, Employer } from '../../types/types';

const REGULAR_USER_COLLECTION_NAME = 'regularUser';
const ADMIN_COLLECTION_NAME = 'admin';
const EMPLOYER_COLLECTION_NAME = 'employer';

const collectionNames: string[] = [ADMIN_COLLECTION_NAME, REGULAR_USER_COLLECTION_NAME, EMPLOYER_COLLECTION_NAME];

const userCollectionRefs = (id: string) => [
  doc(db, REGULAR_USER_COLLECTION_NAME, id),
  doc(db, ADMIN_COLLECTION_NAME, id),
  doc(db, EMPLOYER_COLLECTION_NAME, id),
]; 


const parseUser = async (document: DocumentSnapshot<DocumentData>) => {
  const userId = document.id.toString();
  const data = document.data();
  const type = data?.access;
  const user = {
    id: userId,
    ...data,
  }
  if (type === "admin") {
    return user as Admin;
  } 
  if (type === "regularUser") {
    return user as RegularUser;
  } 
  return user as Employer;

};

export const getUser = async (id: string): Promise<RegularUser | null> => {
  const collections = userCollectionRefs(id);
  const docSnaps = await Promise.all(collections.map(c => getDoc(c)))
  const docSnap = docSnaps.find(document => document.exists())
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

export const updateUser = async(userId: string, newFields: Map<string, string | string[] | boolean>, userType: string) => {
  const docRef = doc(db, userType, userId);
  await updateDoc(docRef, Object.fromEntries(newFields));
};


const attemptDeleteUserFromCollection = async (phoneNumber: string, collectionName: string): Promise<void> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach(async (document) => {
    if (document.exists()) {
      if (document.data().phoneNumber === phoneNumber) {
        await deleteDoc(document.ref);
      }
    }}
  )
}

export const deleteUserFromFirestore = async (phoneNumber: string): Promise<void> => {
  collectionNames.map(col => attemptDeleteUserFromCollection(phoneNumber, col))
}


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
      likedJobs: [], // switched to string of jobIds to match Firebase
      name: 'test phone',
      phoneNumber: assignPhoneNumber,
      verified: true,
    });
  }
};
