// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import Constants from 'expo-constants';
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"; 
import { collection, getDocs } from "firebase/firestore"; 
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId,
};

// Initialize Firebase
const firebaseApp = firebase;

if (firebaseConfig?.projectId) {
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore();
  }

export default firebaseApp;