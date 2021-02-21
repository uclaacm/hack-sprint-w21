import firebase from 'firebase';

// Firebase configuration (copy from firebase app setup)
let firebaseConfig = {
    // Replace with your own config info
}

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();