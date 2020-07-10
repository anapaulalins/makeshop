var firebaseConfig = {
    apiKey: "AIzaSyBauY1BnV23wf0aT6m6eG1bXNaM7u2z6sw",
    authDomain: "makeshop-fe1ef.firebaseapp.com",
    databaseURL: "https://makeshop-fe1ef.firebaseio.com",
    projectId: "makeshop-fe1ef",
    storageBucket: "makeshop-fe1ef.appspot.com",
    messagingSenderId: "452831087841",
    appId: "1:452831087841:web:57e34ff63afa9e53f97ba0",
    measurementId: "G-NMH1XJ258Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();