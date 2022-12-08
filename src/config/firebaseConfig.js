import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDwLgjLnihce2_DDDEa1wp8-LiffFXnSmY",
    authDomain: "website-demo-yan.firebaseapp.com",
    databaseURL: "https://website-demo-yan-default-rtdb.firebaseio.com",
    projectId: "website-demo-yan",
    storageBucket: "website-demo-yan.appspot.com",
    messagingSenderId: "993140144072",
    appId: "1:993140144072:web:c92558c32bf8d78551f2fd",
    measurementId: "G-H2F053DQDF"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp