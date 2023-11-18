import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCARIYC7OtTmRY1BQ-1BJPaLdrq8kUak0U',
  authDomain: 'mypageup-8f494.firebaseapp.com',
  projectId: 'mypageup-8f494',
  storageBucket: 'mypageup-8f494.appspot.com',
  messagingSenderId: '1059926061382',
  appId: '1:1059926061382:web:39f7a5912eb5f7bc613547',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
