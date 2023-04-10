import {
  getDoc,
  doc,
  collection,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebaseApp';

const accessCollection = collection(db, 'access');

export const addAccess = async (phoneNumber: string, userType: string) => {
  const accessObject = { activated: false, access: userType};
  await setDoc(doc(db, 'access', phoneNumber), accessObject);
}

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
  return false;
};
