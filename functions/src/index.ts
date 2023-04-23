import functions = require('firebase-functions');
import admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.firestore();

// const approvedJobsCollection = firestore.collection('approvedJobs');
const testJobsCollection = firestore.collection('testCloudFunction');

exports.updateExpiredJobs = functions.pubsub
  .schedule('*/1 * * * *') // 0 12 * * * is once a day
  .onRun(async () => {
    functions.logger.log('at top of cloud function');
    const approvedJobs = testJobsCollection.get(); // approvedJobsCollection
    const now = new Date();
    (await approvedJobs).forEach(async job => {
      functions.logger.log('looping through jobs collection');
      // const jobId = job.get('id');
      const jobDate = new Date(job.get('date').seconds * 1000);
      const diff = now.getTime() - jobDate.getTime();
      // 60 days in milliseconds --> 5184000000
      if (diff > 259200000) {
        functions.logger.log('removing a job inside cloud function');
        // const testCloudFunctionCollection =
        //   firestore.collection('testCloudFunction');
        // testCloudFunctionCollection.doc(jobId).set(job.data());
        job.ref.delete();
      }
    });
  });
