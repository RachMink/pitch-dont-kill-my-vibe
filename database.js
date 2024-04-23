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

// export const likePitch = async (pitchId) => {
//   const docSnap = await getDoc(doc(db, "pitches", pitchId));

//   if (docSnap.exists()) {
//     const docData = docSnap.data();

//     await updateDoc(doc(db, "pitches", pitchId), {
//       likes: docData.likes + 1,
//     });
//   }
// };

// export const dislikePitch = async (pitchId) = {

// };
