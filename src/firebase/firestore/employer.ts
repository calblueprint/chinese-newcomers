import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Employer, Job } from '../../types/types';
import { db } from '../config';
import { objectToBooleanMap, mapToObject } from '../helpers';
import { getJob } from './job';
import { APPROVED_JOBS_COLLECTION, EMPLOYER_COLLECTION } from './constants';

// TODO: find all use cases and ensure they are support for admins as well as employers
// Create function to add single notApproved job
// Use this in job posting w/ status of pending
export const addCreatedJobs = async (
  jobID: string,
  employerID: string, // using employerID instead of userObject for case of admin posting job for an employer
  status: boolean,
): Promise<void> => {
  try {
    const update: Record<string,boolean> = {};
    const docRef = doc(db, EMPLOYER_COLLECTION, employerID);
    update[`createdJobs.${jobID}`] = status;
    await updateDoc(docRef, update);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// TODO: find all use cases and ensure they are support for admins as well as employers
// Create function to remove single job (either notApproved or approvedJobs) from map of employerJobs
export const removeCreatedJobs = async (
  jobID: string,
  employerID: string,
): Promise<void> => {
    try {
      const docRef = doc(db, EMPLOYER_COLLECTION, employerID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const employer = docSnap.data() as Employer;
        const createdJobsMap = objectToBooleanMap(employer.createdJobs);
        createdJobsMap.delete(jobID);
        await updateDoc(docRef, {createdJobs: mapToObject(createdJobsMap)});
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
};

// Get all jobs from an employer's createdJobs map
export const getAllCreatedJobs = async (employerID: string): Promise<Job[]> => {
  try {
    const docRef = doc(db, EMPLOYER_COLLECTION, employerID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const createdJobs = docSnap.data()?.createdJobs;
      const promises: Array<Promise<Job>> = [];
      if (createdJobs) {
        Object.entries(createdJobs).map(async pair => {
          const key = pair[0];
          const val = pair[1];
          const collectionName = val ? APPROVED_JOBS_COLLECTION : 'notApprovedJobs';
          promises.push(getJob(key, collectionName));
        });
      } else {
        console.log('No jobs created.');
      }
      const jobs = await Promise.all(promises);
      return jobs;
    }
    return [];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// TODO: find all use cases and ensure they are support for admins as well as employers
// Change status of existing job in map
// Use when job is approved to change from pending to approved
export const changeCreatedJobsStatus = async (
  employerID: string,
  jobID: string,
): Promise<void> => {
  try {
    const createdUpdate: Record<string,boolean> = {};
    const approvedUpdate: Record<string,boolean> = {};
    const docRef = doc(db, EMPLOYER_COLLECTION, employerID);
    const approvedRef = doc(db, APPROVED_JOBS_COLLECTION, jobID);
    createdUpdate[`createdJobs.${jobID}`] = true;
    await updateDoc(docRef, createdUpdate);
    // Not changing approved field
    approvedUpdate.approved = true;
    await updateDoc(approvedRef, approvedUpdate);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// Build out screens, filtering between approved & pending (similar to feed screen)