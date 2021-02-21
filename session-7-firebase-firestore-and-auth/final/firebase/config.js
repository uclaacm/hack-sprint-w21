import firebase from 'firebase';

// Firebase configuration (copy from firebase app setup)
let firebaseConfig = {

}

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();