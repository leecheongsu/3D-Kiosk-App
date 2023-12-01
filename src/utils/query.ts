import firebase from 'firebase';
import firestore = firebase.firestore;

export async function duplicateCollection() {
  try {
    const prodUlsan = 'intro_3d/24MNk1rIJ6KMb669P9yD';
    const prodDaejeon = 'intro_3d/Jp6RYo6saJ7aiVpKXcEs';

    const devUlsan = 'dev_intro_3d/24MNk1rIJ6KMb669P9yD';
    const devDaejeon = 'dev_intro_3d/Jp6RYo6saJ7aiVpKXcEs';

    const sourceSnapshot = await firestore().collection(prodDaejeon + '/icons').get();

    const batch = firestore().batch();

    sourceSnapshot.forEach((doc) => {
      const data = doc.data();
      const newDocRef = firestore()
        .collection(devDaejeon + '/icons')
        .doc(doc.id);
      batch.set(newDocRef, data);
    });

    await batch.commit();

    console.log('clear!');
  } catch (error) {
    console.error('duplicate Collection Error : ', error);
  }
}
