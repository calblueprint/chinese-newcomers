import {
  getDoc,
  doc,
  collection,
  updateDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Access, EmployerRequest } from '../../types/types';
import { db } from '../firebaseApp';

const collectionName = "employerRequest"


export const createEmployerRequest = async (employerRequest: EmployerRequest) => {
  await setDoc(doc(db, 'employerRequests', employerRequest.phoneNumber), employerRequest);
}

export const checkEmployerRequest = async (phoneNumber: string) => {
  await getDoc();
}

export const deleteEmployerRequest = async (
  employerRequestId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, employerRequestId);
    await deleteDoc(docRef);
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

// export const getAccess = async (id: string): Promise<Access | null> => {
//   const docRef = doc(db, 'access', id);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     return docSnap.data() as Access;
//   }
//   return null;
// };

// export const activatedAdmin = async (phoneNumber: string): Promise<void> => {
//   const docRef = doc(db, 'access', phoneNumber);
//   const data = {
//     activated: true,
//   };
//   await updateDoc(docRef, data);
// };

// export const getActivationStatus = async (
//   phoneNumber: string,
// ): Promise<boolean> => {
//   const docRef = doc(db, 'access', phoneNumber);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     if (docSnap.data().activated) {
//       console.log(
//         'You are an activated admin user. Please sign in as an admin.',
//       );
//       return true;
//     }
//     console.log('Admin not activated.');
//     return false;
//   }
//   return false;
// };
