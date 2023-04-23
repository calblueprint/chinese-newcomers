import { doc, updateDoc, getDoc, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../config';
import { getJob } from './job';
import { Job } from '../../types/types';

// Create function to add single notApproved job
// Use this in job posting w/ status of pending
export const addCreatedJobs = async (
  //   userObject: User | null,
  jobID: string,
  employerID: string, // using employerID instead of userObject for case of admin posting job for an employer
  status: string,
): Promise<void> => {
  try {
    const docRef = doc(db, 'employer', employerID);
    const docSnap = await getDoc(docRef);
    const jobPath = 'createdJobs.'.concat(jobID);
    console.log('job path successfully created');

    if (docSnap.exists()) {
      if (status == 'notApproved') {
        console.log('creating pending job');
        setDoc(docRef, { jobPath: false } );
        console.log('new pending job successfully created');
      } else {
        console.log('creating approved job');
        setDoc(docRef, { jobPath: true });
        console.log('new approved job successfully created');
      }
    } else {
      console.log('No such employer exists.');
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
// Create function to remove single job (either notApproved or approvedJobs) from map of employerJobs
// export const removeCreatedJobs = async (
//     jobID: string,
//     // collectionName: string,
//     employerID: string,
// ): Promise<void> => {
//     try {
//         const docRef = doc(db, ‘employer’, employerID);
//         const data = jobID;
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//             if (docSnap.data().createdJobs.get(jobID)) {
//                 await updateDoc(docRef, {notApprovedJobs: arrayRemove(data) });
//             } else {
//                 await updateDoc(docRef, {approvedJobs: arrayRemove(data) });
//             }
//         }
//     } catch (e) {
//         console.error(e);
//         throw e;
//     }
// };
// Create function to update createdJobs with map of employerJobs
// export const updateEmployerJobs = async (
//   employerJobs: Map<string, boolean>,
//   employerID: string,
// ): Promise<void> => {
//   try {
//     const docRef = doc(db, ‘employer’, employerID);
//     updateDoc(docRef, { createdJobs: employerJobs });
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
//   };

// Get all jobs from an employer's createdJobs map
export const getAllCreatedJobs = async (employerID: string): Promise<Job[]> => {
  try {
    const docRef = doc(db, 'employer', employerID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const createdJobs = docSnap.data()?.createdJobs;
      const promises: Array<Promise<Job>> = [];

      if (createdJobs) {
        for (const [jobId, isApproved] of Object.entries(createdJobs)) {
          const collectionName = isApproved
            ? 'approvedJobs'
            : 'notApprovedJobs';
          const job = getJob(jobId, collectionName);
          promises.push(job);
        }
      }

      const jobs = await Promise.all(promises);
      return jobs;
    } else {
      console.log('No such employer.');
      return [];
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Change status of existing job in map
// Use when job is approved to change from pending to approved
export const changeCreatedJobsStatus = async (
  userObject: User | null,
  jobID: string,
): Promise<void> => {
  try {
    const docRef = doc(db, 'employer', userObject.id);
    if (userObject.createdJobs.get(jobID) == false) {
      const jobPath = 'createdJobs.'.concat(jobID);
      console.log('job path successfully created');
      updateDoc(docRef, { jobPath: true });
    } else {
      console.log('This job is already approved.');
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Build out screens, filtering between approved & pending (similar to feed screen)
