import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Access } from '../../types/types';
import { db } from '../firebaseApp';
import { ACCESS_COLLECTION } from './constants';

export const addAccess = async (phoneNumber: string, userType: string) => {
  const accessObject = { activated: false, access: userType };
  await setDoc(doc(db, ACCESS_COLLECTION, phoneNumber), accessObject);
};

export const getAccess = async (id: string): Promise<Access | null> => {
  const docRef = doc(db, ACCESS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Access;
  }
  return null;
};

export const activateUser = async (phoneNumber: string): Promise<void> => {
  const docRef = doc(db, ACCESS_COLLECTION, phoneNumber);
  const data = {
    activated: true,
  };
  await updateDoc(docRef, data);
};

export const getActivationStatus = async (
  phoneNumber: string,
): Promise<boolean> => {
  const docRef = doc(db, ACCESS_COLLECTION, phoneNumber);
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
  return false;
};
