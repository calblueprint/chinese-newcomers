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
import { RegularUser, Admin, Employer, genericUser, User } from '../../types/types';

// interface Dictionary<T> {
//   [key: genericUser]: T;
// }
const REGULAR_USER_COLLECTION_NAME = 'regularUser';
const ADMIN_COLLECTION_NAME = 'admin';
const EMPLOYER_COLLECTION_NAME = 'employer';

const userCollectionRefs = (id: string) => [
  doc(db, REGULAR_USER_COLLECTION_NAME, id),
  doc(db, ADMIN_COLLECTION_NAME, id),
  doc(db, EMPLOYER_COLLECTION_NAME, id),
]; 


const userTypeToConstructorMap = new Map<string, User>([
  [REGULAR_USER_COLLECTION_NAME, <RegularUser>{}],
  [ADMIN_COLLECTION_NAME, <Admin>{}],
  [EMPLOYER_COLLECTION_NAME, <Employer>{}],
]);

// QueryDocumentSnapshot<DocumentData>
const parseUser = async (document: QueryDocumentSnapshot<any>) => {
  const userId = document.id.toString();
  const data = document.data();
  const type = data.access;
  
  // const userConstructors: Dictionary<genericUser> = {
  //   regular: RegularUser,
  //   admin: Admin,
  //   employer: Employer,
  // }

  const userType = userTypeToConstructorMap.get(type);
  if (!userType) {
    console.log('No such user type!');
    return null;
  }

  const user = {
    id: userId,
    ...data,
  }

  return user as typeof userType;
};

export const getUser = async (id: string): Promise<User | null> => {
  const userRefs = userCollectionRefs(id);

  const userDocs = await Promise.all(userRefs.map((ref) => getDoc(ref)));
  const userDoc = userDocs.find((doc) => doc.exists);
  if (!userDoc) {
      console.log('No such document!');
      return null;
  };
  console.log('User data:', userDoc.data());
  return parseUser(userDoc);
};

export const addUser = async (user: genericUser): Promise<void> => {
  const type = user.access;
  const itemsRef = doc(db, type, user.id);
  await setDoc(itemsRef, user);
};

export const updateUser = async(userId: string, newField: Dictionary<string>) => {
  const user = getUser(userId);
  const userConstructors: Dictionary<string> = {
    RegularUser: 'regularUser',
    Admin: 'admin',
    Employer: 'employer',
  };

  const userType = userConstructors[user];
  const docRef = doc(db, userType, userId);
  const field = Object.keys(newField)[0];
  const data = {
    field = newField[field];
  };
  await updateDoc(docRef, data);
};

export const deleteUser = async (user: genericUser): Promise<void> => {
  const type = user.access;
  const userId = user.id;
  const docRef = doc(db, type, userId);
  await deleteDoc(docRef);
}


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
