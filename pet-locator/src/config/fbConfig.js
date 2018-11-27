
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAoYK6-Po20qnBuemPH1RZM6vRneCamnig",
    authDomain: "capstone-9d5eb.firebaseapp.com",
    databaseURL: "https://capstone-9d5eb.firebaseio.com",
    projectId: "capstone-9d5eb",
    storageBucket: "capstone-9d5eb.appspot.com",
    messagingSenderId: "994919451382"
  };


  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true});

  export default firebase;