import { UserCredential } from 'firebase/auth';
import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Admin, Employer, GenericUser, RegularUser } from '../../types/types';
import { db } from '../config';

const REGULAR_USER_COLLECTION_NAME = 'regularUser';
const ADMIN_COLLECTION_NAME = 'admin';
const EMPLOYER_COLLECTION_NAME = 'employer';

const userCollectionRefs = (id: string) => [
  doc(db, REGULAR_USER_COLLECTION_NAME, id),
  doc(db, ADMIN_COLLECTION_NAME, id),
  doc(db, EMPLOYER_COLLECTION_NAME, id),
];

export const userTypeToConstructorMap = new Map<string, GenericUser>([
  [REGULAR_USER_COLLECTION_NAME, <RegularUser>{}],
  [ADMIN_COLLECTION_NAME, <Admin>{}],
  [EMPLOYER_COLLECTION_NAME, <Employer>{}],
]);

const constructorToUserTypeMap = new Map<GenericUser, string>([
  [<RegularUser>{}, REGULAR_USER_COLLECTION_NAME],
  [<Admin>{}, ADMIN_COLLECTION_NAME],
  [<Employer>{}, EMPLOYER_COLLECTION_NAME],
]);

const parseUser = async (document: DocumentSnapshot<DocumentData>) => {
  const userId = document.id.toString();
  const data = document.data();
  const type = data?.access;
  const userType = userTypeToConstructorMap.get(type);
  if (!userType) {
    console.log('User type not found.');
    return null;
  }
  const user = {
    id: userId,
    ...data,
  };
  return user as typeof userType;
};

export const getUser = async (id: string): Promise<GenericUser | null> => {
  const collections = userCollectionRefs(id);
  const docSnaps = await Promise.all(collections.map(c => getDoc(c)));
  const docSnap = docSnaps.find(document => document.exists());
  if (docSnap) {
    return parseUser(docSnap);
  }
  return null;
};

export const addUser = async (user: GenericUser): Promise<void> => {
  const type = user.access;
  const itemsRef = doc(db, type, user.id);
  await setDoc(itemsRef, user);
};

export const updateUser = async (
  userId: string,
  newFields: Map<string, string | string[] | boolean>,
) => {
  const user = await getUser(userId);
  if (!user) {
    console.log('User does not exist.');
    return;
  }
  const userType = constructorToUserTypeMap.get(user);
  if (!userType) {
    console.log('User type does not exist.');
    return;
  }
  const docRef = doc(db, userType, userId);
  const data: { [key: string]: string | string[] | boolean } = {};
  newFields.forEach((newValue, field) => {
    data[field] = newValue;
  });
  await updateDoc(docRef, data);
};

export const deleteUser = async (user: GenericUser): Promise<void> => {
  const type = user.access;
  const userId = user.id;
  const docRef = doc(db, type, userId);
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

    const userType = userTypeToConstructorMap.get(accessLevel);
    const userToBeAdded: GenericUser = {
      id: user.uid,
      access: accessLevel,
      likedJobs: [], // switched to string of jobIds to match Firebase
      name: 'test phone',
      phoneNumber: assignPhoneNumber,
      verified: true,
    };

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
