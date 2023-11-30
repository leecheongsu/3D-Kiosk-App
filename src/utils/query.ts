import firebase from "firebase";
import firestore = firebase.firestore;

export async function duplicateCollection(path : string) {
  try {
    const sourceSnapshot = await firestore().collection(path + '/category').get();

    const batch = firestore().batch();

    sourceSnapshot.forEach((doc) => {
      const data = doc.data();
      const newDocRef = firestore()
        .collection(path + '/eng').doc(doc.id);
      batch.set(newDocRef, data);
    });

    await batch.commit();

    console.log('clear!');
  } catch (error) {
    console.error('duplicate Collection Error : ', error);
  }
}