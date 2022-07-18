// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// console.log("firebase", firebase);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAW-zzskpkMluhfPhDFGp-K2jUmgGxx2A",
  authDomain: "dcart-29eef.firebaseapp.com",
  projectId: "dcart-29eef",
  storageBucket: "dcart-29eef.appspot.com",
  messagingSenderId: "93060348169",
  appId: "1:93060348169:web:c74c4699a9a8a071f63bd8",
  measurementId: "G-E2D1KZVLW2",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export let url;

// export const onUpload = (event, imageData) => {
//   event.preventDefault();
//   const storageRef = ref(storage, `images/${imageData.file.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, imageData.file);
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {},
//     (error) => {
//       console.log(error);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((uri) => {
//         console.log(uri);
//       });
//     },
//   );
// };
