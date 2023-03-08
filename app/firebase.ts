import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCSw2UX-qWdVe46AQYNzq02X1PkzeKC73M',
  authDomain: 'wedding-7de55.firebaseapp.com',
  projectId: 'wedding-7de55',
  storageBucket: 'wedding-7de55.appspot.com',
  messagingSenderId: '300726044720',
  appId: '1:300726044720:web:f8e82672b987de4b8b45f5',
  measurementId: 'G-Z2PVX0N5QC',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, 'gs://wedding-7de55.appspot.com/');
