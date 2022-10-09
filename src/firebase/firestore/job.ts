import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import { Jobs, Users } from "../../types/schema";


const db = firebaseApp.firestore();
const jobCardCollection = db.collection("jobs");

export const getJob = async(id: string): Promise<Jobs> => {
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    return await parseJob(docSnap)
}

const parseJob = async(doc) => {
    const job_id = doc.id.toString();
    const data = doc.data();
    const job = {
        apiKey: data.apiKey,
        authDomain: data.authDomain,
        projectId: data.projectId,
        storageBucket: data.storageBucket,
        messagingSenderId: data.messagingSenderId,
        appId: data.appId,
    };
    return job as Job;
};
export const createJob = async(job: Job): Promise<void> => {
}

export const getAllJobs = async()

export const updateJob = async()

export const deleteJob = async()