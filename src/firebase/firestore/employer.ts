import { doc, updateDoc, getDoc, getDocs, arrayRemove, arrayUnion, collection } from 'firebase/firestore';
import { db } from '../config';
import { getAllJobs, getJob, parseJob } from './job';


// Create function to add single job (either new job to notApproved or newly approved to approvedJobs) from map of employerJobs
// Use this in job posting w/ status of pending
export const addCreatedJobs = async (
    jobID: string,
    employerID: string,
    status: string,
): Promise<void> => {
    try {
        const docRef = doc(db, ‘employer’, employerID);
        const data = jobID;
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            if (docSnap.data().createdJobs.notApprovedJobs.includes(jobID)) {
                await updateDoc(docRef, {approvedJobs: arrayUnion(data) });
            } else {
                await updateDoc(docRef, {notApprovedJobs: arrayUnion(data) });
            }
        }
    } catch (e) {
        console.error(e);
        throw e;
    };
// Create function to remove single job (either notApproved or approvedJobs) from map of employerJobs
export const removeCreatedJobs = async (
    jobID: string,
    // collectionName: string,
    employerID: string,
): Promise<void> => {
    try {
        const docRef = doc(db, ‘employer’, employerID);
        const data = jobID;
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            if (docSnap.data().createdJobs.get(jobID)) {
                await updateDoc(docRef, {notApprovedJobs: arrayRemove(data) });
            } else {
                await updateDoc(docRef, {approvedJobs: arrayRemove(data) });
            }
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
};
// Create function to update createdJobs with map of employerJobs
export const updateEmployerJobs = async (
  employerJobs: Map,
  employerID: string,
): Promise<void> => {
  try {
    const docRef = doc(db, ‘employer’, employerID);
    updateDoc(docRef, { createdJobs: employerJobs });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Get all jobs from an employer's createdJobs map
export const getAllCreatedJobs = async (
    userObject: User | null,
  ): Promise<Job[]> => {
    try {
      const employerRef = doc(db, 'employer', userObject.uid);
      const employerSnap = await getDoc(employerRef);
  
      if (employerSnap.exists()) {
        const createdJobs = employerSnap.data()?.createdJobs;
        const promises: Array<Promise<Job>> = [];
  
        if (createdJobs) {
          for (const [jobId, isApproved] of Object.entries(createdJobs)) {
            const collectionName = isApproved ? 'approvedJobs' : 'notApprovedJobs';
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
    id: string,
    collectionName: string,
): Promise<>

// Build out screens, filtering between approved & pending (similar to feed screen)

}



