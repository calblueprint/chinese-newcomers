import functions = require('firebase-functions');
import admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.firestore();

const approvedJobsCollection = firestore.collection('approvedJobs');

exports.updateExpiredJobs = functions.pubsub
  .schedule('0 12 * * *')
  .onRun(async () => {
    const approvedJobs = approvedJobsCollection.get();
    const now = new Date();
    (await approvedJobs).forEach(async job => {
      const jobId = job.get('id');
      const jobDate = new Date(job.get('date').seconds * 1000);
      const diff = now.getTime() - jobDate.getTime();
      if (diff > 5184000000) {
        const expiredJobsCollection = firestore.collection('expiredJobs');
        expiredJobsCollection.doc(jobId).set(job.data());
        job.ref.delete();
      }
    });
  });
