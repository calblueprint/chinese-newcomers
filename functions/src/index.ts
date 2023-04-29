import functions = require('firebase-functions');
import admin = require('firebase-admin');
import json2csv = require('json2csv');

admin.initializeApp();
const firestoreAdmin = admin.firestore();

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

exports.createCSV = functions.pubsub
  .schedule('0 12 * * *') // change to 30 days
  .onRun(async () => {
    const approvedJobsCollection = firestoreAdmin.collection('expiredJobs');
    const approvedJobs = approvedJobsCollection.get();
    const jobs: admin.firestore.DocumentData[] = [];
    (await approvedJobs).forEach(async job => {
      jobs.push(job.data());
    });
    // TODO: export jobs to google sheet

    // const csv = await json2csv.parse({ data: jobs });
    // firestoreAdmin.collection('mail').add({
    //   to: ['stephwonggg23@gmail.com'],
    //   message: {
    //     subject: 'Expired Jobs',
    //     msg: 'Here are the new expired jobs from the job feed.',
    //     attachements: csv,
    //   },
    // });
    // delete expired jobs
    const expiredJobsCollection = firestoreAdmin.collection('expiredJobs');
    const snapshot = await expiredJobsCollection.get();
    const batch = firestoreAdmin.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  });

// let databaseName = '';
// exports.scheduledFirestoreExport = functions.pubsub
//   .schedule('0 12 * * *')
//   .onRun(async () => {
//     const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
//     if (projectId) {
//       databaseName = client.databasePath(projectId, '(default)');
//     }
//     // maybe check to make sure expiredJobs isn't empty first to not send blank document
//     client.exportDocuments({
//       name: databaseName,
//       outputUriPrefix: bucket,
//       // Leave collectionIds empty to export all collections
//       // or set to a list of collection IDs to export,
//       // collectionIds: ['users', 'posts']
//       collectionIds: ['expiredJobs'],
//     });
//     // send email -- how will we know which csv file to get from backing
//     // delete bucket?
//     // what is the file name --> maybe use getFiles bc there should only be one file if we delete right away
//     admin
//       .storage()
//       .bucket('expired-jobs')
//       .getFiles()
//       .then(files => {
//         functions.logger.log(files);
//         // console.log(files);
//       });
// admin.storage().bucket('expired-jobs').
// admin.storage().bucket('expired-jobs').file('test').delete();
// admin.storage().bucket().file().delete() // pass in bucket name into bucket and fileame into file
// delete from expired jobs

// return client
//   .exportDocuments({
//     name: databaseName,
//     outputUriPrefix: bucket,
//     // Leave collectionIds empty to export all collections
//     // or set to a list of collection IDs to export,
//     // collectionIds: ['users', 'posts']
//     collectionIds: ['expiredJobs'],
//   })
//   .then(responses => {
//     const response = responses[0];
//     functions.logger.log(`Operation Name: ${response.name}`);
//     console.log(`Operation Name: ${response.name}`);
//   })
//   .catch(err => {
//     console.error(err);
//     throw new Error('Export operation failed');
//   });
// });

// exports.sendEmail = functions.pubsub.schedule('0 12 * * *').onRun(async () => {
//   functions.logger.log('send email function');
// firestoreAdmin.collection('mail').add({
//   to: ['stephwonggg23@gmail.com'],
//   message: {
//     subject: 'Expired Jobs',
//     msg: 'Here are the new expired jobs from the job feed.',
//     attachements: firestoreAdmin.collection('expiredJobs'),
//     // add expired job
//   },
// });
//   // remove expired jobs
// });
