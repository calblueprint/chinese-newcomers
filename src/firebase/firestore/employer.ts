import { doc, updateDoc, getDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../config';

// Create function to add single job (either new job to notApproved or newly approved to approvedJobs) from map of employerJobs
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
export const getCreatedJobs = (
)

// Change status of existing job in map
export const changeCreatedJobsStatus

}



