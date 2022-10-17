import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import { Job, User } from "../../types/types";
import {getDoc, doc, collection, addDoc, getDocs} from "firebase/firestore";

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
        contact_info: data.contact_info,
        description: data.description,
        employer: data.employer,
        end_date: data.end_date,
        hours: data.hours,
        job_creator: data.job_creator,
        salary: data.salary,
        start_date: data.start_date,
    };
    return job as Job;
};
export const createJob = async(job: Job): Promise<void> => {
    const docRef = collection(db, "jobs");
    await addDoc(docRef, job);
}

export const getAllJobs = async(): Promise<Job[]> => {
    try {
        const jobsRef = collection(db, "jobs");
        const promises: Promise<Job>[] = [];
        const docSnap = await getDocs(jobsRef);
        docSnap.forEach((job) => {
            promises.push(parseJob(job));
        })
        const allJobs = await Promise.all(promises);
        return allJobs;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};

// export const updateJob = async(job_id: string): Promise<void> => {
// }

export const deleteJob = async(job_id: string): Promise<void> => {
    try {
        await jobCardCollection.doc(job_id).delete();
    }
    catch(e) {
        console.warn(e);
        throw e;
    }
};