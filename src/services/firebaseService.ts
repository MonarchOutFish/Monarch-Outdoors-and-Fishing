import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export async function subscribeToNewsletter(email: string) {
  try {
    const docRef = await addDoc(collection(db, 'subscribers'), {
      email,
      subscribedAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    if(error instanceof Error && error.message.includes('the client is offline')) {
       throw new Error("Unable to connect to the database. Please check your connection.");
    }
    throw error;
  }
}
