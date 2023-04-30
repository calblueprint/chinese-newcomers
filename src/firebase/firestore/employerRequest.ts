import { getDoc, doc, collection, updateDoc, setDoc } from 'firebase/firestore';
import { Access, EmployerRequest } from '../../types/types';
import { db } from '../firebaseApp';

// const Collection = collection(db, 'access');

export const createEmployerRequest = async (
  employerRequest: EmployerRequest,
) => {
  await setDoc(
    doc(db, 'employerRequests', employerRequest.phoneNumber),
    employerRequest,
  );
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
