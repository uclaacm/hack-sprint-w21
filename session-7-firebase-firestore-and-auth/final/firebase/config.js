import firebase from 'firebase';

// Firebase configuration (copy from firebase app setup)
let firebaseConfig = {
    apiKey: "AIzaSyDZmpm3SKwRUJXAR3pvqW4mo3GKoVUbXk0",
    authDomain: "firesidechats-2e176.firebaseapp.com",
    projectId: "firesidechats-2e176",
    storageBucket: "firesidechats-2e176.appspot.com",
    messagingSenderId: "430239900703",
    appId: "1:430239900703:web:6f41419e9f67856298a12a"
}

firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const db = firebase.firestore();