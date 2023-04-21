import { doc, updateDoc, getDoc, getDocs, arrayRemove, arrayUnion, collection } from 'firebase/firestore';
import { db } from '../config';
import { getAllJobs, getJob, parseJob } from './job';

const approvedJobsCollection = collection(db, 'approvedJobs');
const notApprovedJobsCollection = collection(db, 'notApprovedJobs');
// Create function to add single job (either new job to notApproved or newly approved to approvedJobs) from map of employerJobs
// Use this in job posting w/ status of pending
export const addCreatedJobs = async (
    jobID: string,
    employerID: string,
    status: string,
): Promise<void> => {
    try {
        // Assuming we will have employers user type in firebase later
        const docRef = doc(db, ‘employers’, employerID);
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
        const docRef = doc(db, ‘employers’, employerID);
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
    const docRef = doc(db, ‘employers’, employerID);
    updateDoc(docRef, { createdJobs: employerJobs });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Get jobs, job.ts
export const getAllCreatedJobs = async (
    userObject: User | null,
    ): Promise<Job[]> => {
    try {
        const promises: Array<Promise<Job>> = []; // declare empty array to store jobs
        // promises.push(getAllJobs('approvedJobs'), getAllJobs('notApprovedJobs')); // append all jobs to array
        // const allJobs = await Promise.all(promises); // get all jobs and store as allJobs
        // return allJobs.filter(obj =>
        //     Object.prototype.hasOwnProperty.call(obj, 'jobPosition'),
        //     ); // filter for 
    }
}

// Change status of existing job in map
// Use when job is approved to change from pending to approved
export const changeCreatedJobsStatus

// Build out screens, filtering between approved & pending (similar to feed screen)

}



