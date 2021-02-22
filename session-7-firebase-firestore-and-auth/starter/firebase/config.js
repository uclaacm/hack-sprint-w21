import firebase from 'firebase';

// Firebase configuration (copy from firebase app setup)
let firebaseConfig = {
    // TODO: Replace with personal Firebase project config
    apiKey: "AIzaSyBUUNmTIb-9D9QHYIt9gOJPuCEl4a4HiB4",
    authDomain: "firesidechats-demo.firebaseapp.com",
    projectId: "firesidechats-demo",
    storageBucket: "firesidechats-demo.appspot.com",
    messagingSenderId: "244222969375",
    appId: "1:244222969375:web:937307cbcbc4fa92c0772a"
}

firebase.initializeApp(firebaseConfig);

// TODO: Export Firestore
export const db = firebase.firestore();

// TODO: Export Auth