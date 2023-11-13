import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/analytics';
import ReduxSagaFirebase from 'redux-saga-firebase';
import { firebaseConfig } from '../config';

let firebaseApp;
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}
const rsf = new ReduxSagaFirebase(firebaseApp);

const analytics = firebase.analytics();
// firestore의 데이테를 변경할때 사용함.
export const db = firebaseApp.firestore();

// firestore의 FieldValue 등을 사용할 때 이용함.
export const firestore = firebase.firestore;

// saga에서 firestore을 사용할때 이용함.
export const rsfDB = rsf.firestore;

//firebase의 storage를 사용할때 이용함.
export const storage = firebaseApp.storage();

export default firebase;
