import {
  getDoc,
  doc,
  collection,
  addDoc,
  getDocs,
  DocumentData,
  DocumentSnapshot,
  updateDoc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import { firebaseApp, db } from '../firebaseApp';
import { Job, User } from '../../types/types';

const approvedJobsCollection = collection(db, 'approvedJobs');
const notApprovedJobsCollection = collection(db, 'notApprovedJobs');

export const parseJob = async (document: DocumentSnapshot<DocumentData>) => {
  const jobId = document.id.toString();
  const data = document.data();
  const job = {
    id: jobId,
    ...(data as Partial<Job>)
  };
  return job as Job;
};

export const getJob = async (id: string, collectionName: string): Promise<Job> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return parseJob(docSnap);
};

export const updateMonthlyCounter = async (
  newLastReset: Date,
  newMonthlyCounter: number
): Promise<void> => {
  const docRef = doc(db, 'approvedJobs', 'metadata');
  // This data object changes the fields that are different from the entry in backend!
  const data = {
    lastReset: newLastReset,
    monthlyCounter: newMonthlyCounter
  };
  await updateDoc(docRef, data);
};

export const getMonthlyCounter = async (): Promise<number> => {
  const docRef = doc(db, 'approvedJobs', 'metadata');
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  // reset monthly counter if new month and not yet reset
  const now = new Date();
  if (now.getMonth() !== data?.lastReset.toDate().getMonth()) {
    await updateMonthlyCounter(now, 0);
    return 0;
  }

  return data?.monthlyCounter;
};

export const createJob = async (job: Partial<Job>, collectionName: string): Promise<void> => {
  const docRef = collection(db, collectionName);
  try {
    if (collectionName === 'approvedJobs') {
      const monthlyCounter = await getMonthlyCounter();
      const additionalZero = monthlyCounter < 9 ? '0' : '';
      const now = new Date();
      const month = (`0${  now.getMonth().toString()}`).slice(-2);
      const jobId =
        now.getFullYear().toString().slice(-2) +
        month +
        additionalZero +
        (monthlyCounter + 1).toString();
      job.id = jobId; 
      await setDoc(doc(db, collectionName, jobId), job);
      await updateMonthlyCounter(now, monthlyCounter + 1);
    } else {
      await addDoc(docRef, job);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (collectionName: string): Promise<Job[]> => {
  try {
    const promises: Array<Promise<Job>> = [];
    const docSnap =
      collectionName === 'approvedJobs'
        ? await getDocs(approvedJobsCollection)
        : await getDocs(notApprovedJobsCollection);
    docSnap.forEach((job) => {
      promises.push(parseJob(job));
    });
    const allJobs = await Promise.all(promises);
    return allJobs.filter((obj) => Object.prototype.hasOwnProperty.call(obj, 'jobPosition')); // filter out metadata and anything w/o required description;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// export const updateJob = async (job_id: string): Promise<void> => {};
export const deleteJob = async (jobId: string, collectionName: string): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, jobId);
    await deleteDoc(docRef);
  } catch (e) {
    console.warn(e);
    throw e;
  }
};
