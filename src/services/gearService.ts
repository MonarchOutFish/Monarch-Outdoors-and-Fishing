import { collection, doc, query, onSnapshot, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from './firebaseService';

export interface GearItem {
  id: string;
  name: string;
  description: string;
  price: string;
  link: string;
  inStock: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export function useGear() {
  const [gear, setGear] = useState<GearItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'gear'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: GearItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as GearItem);
      });
      setGear(items);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching gear:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { gear, loading };
}

export async function addGearItem(item: Omit<GearItem, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'gear'), {
      ...item,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding gear:", error);
    throw error;
  }
}

export async function updateGearItem(id: string, item: Partial<Omit<GearItem, 'id' | 'createdAt' | 'updatedAt'>>) {
  try {
    const docRef = doc(db, 'gear', id);
    await updateDoc(docRef, {
      ...item,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating gear:", error);
    throw error;
  }
}

export async function deleteGearItem(id: string) {
  try {
    const docRef = doc(db, 'gear', id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting gear:", error);
    throw error;
  }
}
