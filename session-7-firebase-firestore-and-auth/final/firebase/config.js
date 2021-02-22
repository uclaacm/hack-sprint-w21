import firebase from 'firebase';

// Firebase configuration (copy from firebase app setup)
let firebaseConfig = {
    // TODO: Replace with your own config info 
}

firebase.initializeApp(firebaseConfig);

// Export firestore instance
export const db = firebase.firestore();