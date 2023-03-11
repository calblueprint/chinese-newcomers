import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { UserCredential } from 'firebase/auth';
import { db } from '../config';
import { RegularUser, Admin, Employer } from '../../types/types';

interface Dictionary<T> {
  [key: string]: T;
}

const parseRegularUser = async (document: QueryDocumentSnapshot<DocumentData>) => {
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
  return user as RegularUser;
};

const parseEmployer = async (document: QueryDocumentSnapshot<DocumentData>) => {
  const userId = document.id.toString();
  const data = document.data();
  const user = {
    id: userId,
    access: data.access,
    createdJobs: data.createdJobs, // might need to map to job objects later
    email: data.email,
    name: data.name,
    phoneNumber: data.phoneNumber,
    verified: data.verified,
    password: data.password,
  };
  return user as Employer;
};

const parseAdmin = async (document: QueryDocumentSnapshot<DocumentData>) => {
  const userId = document.id.toString();
  const data = document.data();
  const user = {
    id: userId,
    access: data.access,
    createdJobs: data.createdJobs, // might need to map to job objects later
    email: data.email,
    name: data.name,
    phoneNumber: data.phoneNumber,
    verified: data.verified,
    password: data.password,
  };
  return user as Admin;
};

export const getRegularUser = async (id: string): Promise<RegularUser | null> => {
  const docRef = doc(db, 'regularUser', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('User data:', docSnap.data());
    return parseRegularUser(docSnap);
  }
  // doc.data() will be undefined in this case
  console.log('No such document!');
  return null;
};

export const getAdmin = async (id: string): Promise<Admin | null> => {
  const docRef = doc(db, 'admin', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('User data:', docSnap.data());
    return parseAdmin(docSnap);
  }
  // doc.data() will be undefined in this case
  console.log('No such document!');
  return null;
};

export const getEmployer = async (id: string): Promise<Employer | null> => {
  const docRef = doc(db, 'employer', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('User data:', docSnap.data());
    return parseEmployer(docSnap);
  }
  // doc.data() will be undefined in this case
  console.log('No such document!');
  return null;
};

export const addRegularUser = async (user: RegularUser): Promise<void> => {
  const itemsRef = doc(db, 'regularUser', user.id);
  await setDoc(itemsRef, user);
};

export const addEmployer = async (user: Employer): Promise<void> => {
  const itemsRef = doc(db, 'employer', user.id);
  await setDoc(itemsRef, user);
};

export const addAdmin = async (user: Admin): Promise<void> => {
  const itemsRef = doc(db, 'admin', user.id);
  await setDoc(itemsRef, user);
};

export const updateRegularUser = async (userId: string, newField: Dictionary<string>): Promise<void> => {
  const docRef = doc(db, 'regularUser', userId);
  const field = Object.keys(newField)[0];
  const data = {
    field = newField[field];
  }
  await updateDoc(docRef, data);
}

export const deleteRegularUser = async (userId: string): Promise<void> => {
  const docRef = doc(db, 'regularUser', userId);
  await deleteDoc(docRef);
};

export const deleteAdmin = async (userId: string): Promise<void> => {
  const docRef = doc(db, 'admin', userId);
  await deleteDoc(docRef);
};

export const deleteEmployer = async (userId: string): Promise<void> => {
  const docRef = doc(db, 'employer', userId);
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
