import { doc, updateDoc, getDoc, setDoc, collection, deleteField } from 'firebase/firestore';
import { db } from '../config';
import { getJob, parseJob } from './job';
import { Job, User } from '../../types/types';
import objectToBooleanMap from '../helpers';

// Create function to add single notApproved job
// Use this in job posting w/ status of pending
// TESTED & WORKING!!
export const addCreatedJobs = async (
  jobID: string,
  employerID: string, // using employerID instead of userObject for case of admin posting job for an employer
  status: boolean,
): Promise<void> => {
  try {
    const update: Record<string,boolean> = {};
    const docRef = doc(db, 'employer', employerID);
    update[`createdJobs.${jobID}`] = status;
    await updateDoc(docRef, update);
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
        console.log('casey');
        console.log(Object.entries(createdJobs));

        Object.entries(createdJobs).map(async pair => {
          const key = pair[0];
          const val = pair[1];
          const collectionName = val ? 'approvedJobs' : 'notApprovedJobs';
          console.log(pair);
          promises.push(getJob(key, collectionName));
        });
      } else {
        console.log('No jobs created.');
      }
      const jobs = await Promise.all(promises);
      console.log('got all createdjobs');
      console.log(jobs);
      console.log('exiting employer.ts');
      return jobs;
    }
    console.log('No such employer.');
    return [];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Change status of existing job in map
// Use when job is approved to change from pending to approved
// TESTED & WORKING
// export const changeCreatedJobsStatus = async (
//   userObject: User | null,
//   jobID: string,
// ): Promise<void> => {
//   try {
//     if (userObject === null) {
//       console.log('User not found.');
//     } else {
//       const createdJobsMap = objectToBooleanMap(userObject.createdJobs);
//       const docRef = doc(db, 'employer', userObject.id);
//       if (createdJobsMap.get(jobID) === false) {
//         const map = new Map<string, boolean>();
//         map.set(jobID, true);
//         await updateDoc(docRef, { createdJobs: Object.fromEntries(map) });
//         const job = await getJob(jobID, 'notApprovedJobs');
//         const updatedJob = { ...job, approved: true };
//         await updateDoc(docRef, {
//           notApprovedJobs: {
//             [jobID]: null,
//           },
//           approvedJobs: {
//             [jobID]: updatedJob,
//           },
//         });
//       } else {
//         console.log('This job is already approved.');
//       }
//       // (await getJob(jobID, "notApprovedJobs")).approved = true;
//     }
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// };

export const changeCreatedJobsStatus = async (
  employerID: string,
  jobID: string,
): Promise<void> => {
  try {
    const createdUpdate: Record<string,boolean> = {};
    const approvedUpdate: Record<string,boolean> = {};
    const docRef = doc(db, 'employer', employerID);
    const approvedRef = doc(db, 'approvedJobs', jobID);
    console.log(docRef);

    // TODO: DELETE NOT APPROVED ENTRY 
    console.log(jobID);
    createdUpdate[`createdJobs.${jobID}`] = true;
    await updateDoc(docRef, createdUpdate);
    approvedUpdate["approved"] = true;
    await updateDoc(approvedRef, approvedUpdate);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Build out screens, filtering between approved & pending (similar to feed screen)
