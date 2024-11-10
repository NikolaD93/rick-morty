import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import {
  VITE_FIREBASE_API_ID,
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_MEASUREMENT_ID,
  VITE_FIREBASE_MSG_SENDER_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
} from '@/config';

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: 'shindiri-test',
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MSG_SENDER_ID,
  appId: VITE_FIREBASE_API_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
