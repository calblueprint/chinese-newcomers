import { firebaseApp, db } from '../firebaseApp';
import {
  getDoc,
  doc,
  collection,
  addDoc,
  getDocs,
  DocumentData,
  DocumentSnapshot,
  updateDoc,
  setDoc
} from 'firebase/firestore';
import { Job, User } from '../../types/types';

const jobCardCollection = collection(db, 'jobs');

export const getJob = async (id: string): Promise<Job> => {
  const docRef = doc(db, 'jobs', id);
  const docSnap = await getDoc(docRef);
  return await parseJob(docSnap);
};
export const parseJob = async (doc: DocumentSnapshot<DocumentData>) => {
  const job_id = doc.id.toString();
  const data = doc.data();
  const job = {
    id: job_id,
    ...(data as Partial<Job>)
  };
  return job as Job;
};

export const getMonthlyCounter = async (): Promise<number> => {
  const docRef = doc(db, 'jobs', 'metadata');
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  // reset monthly counter if new month and not yet reset
  const now = new Date();
  if (now.getMonth() !== data?.lastReset.getMonth()) {
    updateMonthlyCounter(now, 0);
    return 0;
  }

  return data?.monthlyCounter;
};

export const updateMonthlyCounter = async (
  newLastReset: Date,
  newMonthlyCounter: number
): Promise<void> => {
  const docRef = doc(db, 'jobs', 'metadata');
  // This data object changes the fields that are different from the entry in backend!
  const data = {
    lastReset: newLastReset,
    monthlyCounter: newMonthlyCounter
  };
  await updateDoc(docRef, data);
};

export const createJob = async (job: Job): Promise<void> => {
  const docRef = collection(db, 'jobs');
  const monthlyCounter = await getMonthlyCounter();
  const now = new Date();
  await updateMonthlyCounter(now, monthlyCounter + 1);

  const jobId =
    now.getFullYear.toString().slice(-2) +
    now.getMonth.toString() +
    (monthlyCounter + 1).toString();
  await setDoc(doc(db, 'jobs', jobId), job);
};

export const getAllJobs = async (): Promise<Job[]> => {
  try {
    const promises: Array<Promise<Job>> = [];
    const docSnap = await getDocs(jobCardCollection);
    docSnap.forEach((job) => {
      promises.push(parseJob(job));
    });
    const allJobs = await Promise.all(promises);
    return allJobs;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// export const updateJob = async (job_id: string): Promise<void> => {};
export const deleteJob = async (job_id: string): Promise<void> => {
  try {
    await jobCardCollection.doc(job_id).delete();
  } catch (e) {
    console.warn(e);
    throw e;
  }
};
