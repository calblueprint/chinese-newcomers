import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config';
import { getJob } from './job';
import { Job } from '../../types/types';
import objectToBooleanMap from '../helpers';
import { User } from '../../types/types';

// Create function to add single notApproved job
// Use this in job posting w/ status of pending
// TESTED & WORKING!!
export const addCreatedJobs = async (
  jobID: string,
  employerID: string, // using employerID instead of userObject for case of admin posting job for an employer
  status: boolean,
): Promise<void> => {
  try {
    const docRef = doc(db, 'employer', employerID);
    const docSnap = await getDoc(docRef);
    console.log('job path successfully created');
    const map = new Map<string, boolean>();
    map.set(jobID, status);
    if (docSnap.exists()) {
      console.log('creating job');
      //   setDoc(docRef, { createdJobs: Object.fromEntries(map) }, { merge: true });
      await updateDoc(docRef, {
        createdJobs: Object.fromEntries(map),
      });
      console.log('new job successfully created');
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

// Get all jobs from an employer's createdJobs map
// TESTED & WORKING!!
export const getAllCreatedJobs = async (employerID: string): Promise<Job[]> => {
  try {
    const docRef = doc(db, 'employer', employerID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('docsnap exists');
      const createdJobs = docSnap.data()?.createdJobs;
      console.log('found createdJobs');
      console.log(createdJobs);
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
      console.log('got all createdjobs');
      console.log(jobs);
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
// TESTED & WORKING
export const changeCreatedJobsStatus = async (
  userObject: User | null,
  jobID: string,
): Promise<void> => {
  try {
    if (userObject === null) {
      console.log('User not found.');
    } else {
      const createdJobsMap = objectToBooleanMap(userObject.createdJobs);
      const docRef = doc(db, 'employer', userObject.id);
      if (createdJobsMap.get(jobID) === false) {
        const map = new Map<string, boolean>();
        map.set(jobID, true);
        await updateDoc(docRef, { createdJobs: Object.fromEntries(map) });
      } else {
        console.log('This job is already approved.');
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Build out screens, filtering between approved & pending (similar to feed screen)
