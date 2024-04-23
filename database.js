import firebaseApp from "./firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export const createPitch = async (pitch) => {
  const docRef = await addDoc(collection(db, "pitches"), pitch);
  //   console.log("Document written with ID: ", docRef.id);
};

export const getAllPitches = async () => {
  const result = [];
  const querySnapshot = await getDocs(collection(db, "pitches"));
  querySnapshot.forEach((doc) => {
    result.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  //   console.log(result);

  return result;
};

export const deletePitch = async (pitchId) => {
  await deleteDoc(doc(db, "pitches", pitchId));
};

export const likePitch = async (pitchId, likerName) => {
  await updateDoc(doc(db, "pitches", pitchId), {
    likes: arrayUnion(likerName),
  });
};

export const dislikePitch = async (pitchId, dislikerName) => {
  await updateDoc(doc(db, "pitches", pitchId), {
    dislikes: arrayUnion(dislikerName),
  });
};
