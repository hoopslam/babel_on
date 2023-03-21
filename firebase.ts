import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCiaXqBY4atO7_oLb6tbRuvW_fnWMv9leo',
    authDomain: 'babel-on.firebaseapp.com',
    projectId: 'babel-on',
    storageBucket: 'babel-on.appspot.com',
    messagingSenderId: '756661930311',
    appId: '1:756661930311:web:54d9a430f2ab3e7539e462',
};

//Check for other instance of App
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
