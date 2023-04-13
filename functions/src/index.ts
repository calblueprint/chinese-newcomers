import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp();
const firestore = admin.firestore();

export interface Job {
  id: string;
  date: Date;
  companyName: string;
  address: string;
  contactPerson: string;
  phone: string;
  jobPosition: string;
  languageRequirement: string;
  workingHours: string;
  workingDays: string;
  salary: string;
  probationPeriod: string;
  employeeBenefit: string;
  otherInfo: string;
  visible: object;
  liked: boolean;
  category: string;
}

const approvedJobsCollection = firestore.collection('approvedJobs');

export const updateExpiredJobs = functions.pubsub
  .schedule('*/10 * * * *') // 0 12 * * * is once a day but /10 (10 min) for testing
  .onRun(async () => {
    const approvedJobs = approvedJobsCollection.get(); // or .doc() ?
    // const approvedJobs = firestore.doc('approvedJobs'); // takes in a path
    const now = new Date();
    (await approvedJobs).forEach(async job => {
      const jobDate = job.data().get('date');
      const diff = now.getTime() - jobDate.getTime();
      // 60 days in milliseconds --> 5184000000, 432... is 5 days
      if (diff > 432000000) {
        // deleteJob(parsedJob.id, 'approvedJobs'); // can do doc.delete ?
        const testCloudFunctionCollection =
          firestore.collection('testCloudFunction');
        testCloudFunctionCollection.add(job.data()); // not sure
      }
    });
  });
