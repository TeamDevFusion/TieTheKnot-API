import configuration from "./configuration";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: configuration().firebase.apiKey,
    authDomain: configuration().firebase.authDomain,
    projectId: configuration().firebase.projectId,
    storageBucket: configuration().firebase.storageBucket,
    messagingSenderId: configuration().firebase.messagingSenderId,
    appId: configuration().firebase.appId,
    measurementId: configuration().firebase.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
