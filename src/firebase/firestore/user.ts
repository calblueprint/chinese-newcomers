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
import { RegularUser, Admin, Employer, GenericUser } from '../../types/types';

const REGULAR_USER_COLLECTION_NAME = 'regularUser';
const ADMIN_COLLECTION_NAME = 'admin';
const EMPLOYER_COLLECTION_NAME = 'employer';

const userCollectionRefs = (id: string) => [
  doc(db, REGULAR_USER_COLLECTION_NAME, id),
  doc(db, ADMIN_COLLECTION_NAME, id),
  doc(db, EMPLOYER_COLLECTION_NAME, id),
]; 

const userTypeToConstructorMap = new Map<string, GenericUser>([
  [REGULAR_USER_COLLECTION_NAME, <RegularUser>{}],
  [ADMIN_COLLECTION_NAME, <Admin>{}],
  [EMPLOYER_COLLECTION_NAME, <Employer>{}],
]);

const constructorToUserTypeMap = new Map<GenericUser, string>([
  [<RegularUser>{}, REGULAR_USER_COLLECTION_NAME],
  [<Admin>{}, ADMIN_COLLECTION_NAME],
  [<Employer>{}, EMPLOYER_COLLECTION_NAME],
])

// QueryDocumentSnapshot<DocumentData>
const parseUser = async (document: QueryDocumentSnapshot<DocumentData>) => {
  const userId = document.id.toString();
  const data = document.data();
  const type = data.access; 

  // if (!userTypeToConstructorMap.has(type)) {
  //   console.log('Invalid User Type.');
  //   return null;
  // }

  const userType = userTypeToConstructorMap.get(type);

  if (!userType) {
    console.log('User type not found.');
    return null;
  }

  const user = {
    id: userId,
    ...data,
  }

  return user as typeof userType;
};

// edit this using the constants above
export const getUser = async (id: string): Promise<GenericUser | null> => {
  const userRefs = userCollectionRefs(id);

  const userDocs = await Promise.all(userRefs.map((ref) => getDoc(ref)));
  const userDoc = userDocs.find((docSnap) => docSnap.exists);
  if (!userDoc) {
      console.log('No such document!');
      return null;
  };
  console.log('User data:', userDoc.data());
  return parseUser(userDoc as QueryDocumentSnapshot<DocumentData>);
};

export const addUser = async (user: GenericUser): Promise<void> => {
  const type = user.access;
  const itemsRef = doc(db, type, user.id);
  await setDoc(itemsRef, user);
};

// the values for newField might have multiple types (string, string[], or boolean)
export const updateUser = async(userId: string, newFields: Map<string, string | string[] | boolean>) => {
  const user = await getUser(userId);
  if (!user) {
    console.log('User does not exist.')
    return;
  }
  const userType = constructorToUserTypeMap.get(user)
  if (!userType) {
    console.log('User type does not exist.')
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
