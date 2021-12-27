import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA4U3N_rHNEThawFiOJMUcQrpB9C8DOIRc",
    authDomain: "react-journal-app-ed227.firebaseapp.com",
    projectId: "react-journal-app-ed227",
    storageBucket: "react-journal-app-ed227.appspot.com",
    messagingSenderId: "303945078641",
    appId: "1:303945078641:web:4b339cf1536df4e8d3c8d0"
};

const firebaseConfigTesting = {
    apiKey: "AIzaSyDtvmNyvn4N6WsDclhq6Z_YgyaUx2Ibxbc",
    authDomain: "react-journal-app-testin-2523b.firebaseapp.com",
    projectId: "react-journal-app-testin-2523b",
    storageBucket: "react-journal-app-testin-2523b.appspot.com",
    messagingSenderId: "1039074854573",
    appId: "1:1039074854573:web:763617466de7aa833ae824"
  };

let app = "";

if(process.env.NODE_ENV === 'test'){
    //testing
    app = initializeApp(firebaseConfigTesting);
}else{
    //development/production
    app = initializeApp(firebaseConfig);
}

//const app = initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
    app,
    db,
    googleAuthProvider
}