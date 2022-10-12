import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import { Job, User } from "../../types/types";
import {getDoc, doc, collection, addDoc} from "firebase/firestore";

const db = firebaseApp.firestore();
const jobCardCollection = db.collection("jobs");

export const getJob = async(id: string): Promise<Job> => {
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    return await parseJob(docSnap)
}

const parseJob = async(doc) => {
    const job_id = doc.id.toString();
    const data = doc.data();
    const job = {
        job_id: job_id,
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
    const docRef = collection(db, "jobs");
    await addDoc(docRef, job);
}

export const getAllJobs = async(): Promise<Job[]> => {
    try {
        const allJobs = await jobCardCollection.orderBy('job_id').get();
        const promises: Promise<Job> = allJobs.docs.map((doc) => parseJob(doc))
    }
}

export const updateJob = async()

export const deleteJob = async(job_id: string): Promise<void> => {
}