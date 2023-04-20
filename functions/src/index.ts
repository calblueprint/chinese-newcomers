import functions = require('firebase-functions');
import admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.firestore();

const approvedJobsCollection = firestore.collection('approvedJobs');

exports.updateExpiredJobs = functions.pubsub
  .schedule('0 12 * * *') // 0 12 * * * is once a day
  .onRun(async () => {
    const approvedJobs = approvedJobsCollection.get();
    const now = new Date();
    (await approvedJobs).forEach(async job => {
      const jobId = job.get('id');
      const jobDate = new Date(job.get('date').seconds * 1000);
      const diff = now.getTime() - jobDate.getTime();
      // 60 days in milliseconds --> 5184000000
      if (diff > 5184000000) {
        const testCloudFunctionCollection =
          firestore.collection('testCloudFunction');
        testCloudFunctionCollection.doc(jobId).set(job.data());
        job.ref.delete();
      }
    });
  });
