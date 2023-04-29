import functions = require('firebase-functions');
import admin = require('firebase-admin');
import firestore = require('firebase-admin/firestore');

admin.initializeApp();
const firestoreAdmin = admin.firestore();

const client = new firestore.v1.FirestoreAdminClient();
const bucket = 'gs://expired-jobs';

exports.updateExpiredJobs = functions.pubsub
  .schedule('0 12 * * *')
  .onRun(async () => {
    const approvedJobsCollection = firestoreAdmin.collection('approvedJobs');
    const approvedJobs = approvedJobsCollection.get();
    const now = new Date();
    (await approvedJobs).forEach(async job => {
      const jobId = job.get('id');
      const jobDate = new Date(job.get('date').seconds * 1000);
      const diff = now.getTime() - jobDate.getTime();
      if (diff > 5184000000) {
        const expiredJobsCollection = firestoreAdmin.collection('expiredJobs');
        expiredJobsCollection.doc(jobId).set(job.data());
        job.ref.delete();
      }
    });
  });

let databaseName = '';
exports.scheduledFirestoreExport = functions.pubsub
  .schedule('0 12 * * *')
  .onRun(context => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT; //  || process.env.GCLOUD_PROJECT;
    if (projectId) {
      databaseName = client.databasePath(projectId, '(default)');
    }
    return client
      .exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        // Leave collectionIds empty to export all collections
        // or set to a list of collection IDs to export,
        // collectionIds: ['users', 'posts']
        collectionIds: ['expiredJobs'],
      })
      .then(responses => {
        const response = responses[0];
        functions.logger.log(`Operation Name: ${response.name}`);
        console.log(`Operation Name: ${response.name}`);
      })
      .catch(err => {
        console.error(err);
        throw new Error('Export operation failed');
      });
  });

// exports.sendEmail = functions.pubsub.schedule('0 12 * * *').onRun(async () => {
//   functions.logger.log('send email function');
//   firestoreAdmin.collection('mail').add({
//     to: ['stephwonggg23@gmail.com'],
//     message: {
//       subject: 'Expired Jobs',
//       msg: 'Here are the new expired jobs from the job feed.',
//       attachements: firestoreAdmin.collection('expiredJobs'),
//       // add expired job
//     },
//   });
//   // remove expired jobs
// });
