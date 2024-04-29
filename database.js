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
  arrayRemove,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

//Pitch section
export const createPitch = async (pitch) => {
  const docRef = await addDoc(collection(db, "pitches"), pitch);
  //   console.log("Document written with ID: ", docRef.id);
};

export const getSpecificPitch = async (pitchId) => {
  const pitch = await getDoc(doc(db, "pitches", pitchId));
  // console.log(pitch.data());

  return {
    id: pitch.id,
    ...pitch.data(),
  };
  //  pitch.data();
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

  return result;
};

export const deletePitch = async (pitchId) => {
  await deleteDoc(doc(db, "pitches", pitchId));
};

export const likePitch = async (pitchId, likerName) => {
  await updateDoc(doc(db, "pitches", pitchId), {
    likes: arrayUnion(likerName),
    viewedBy: arrayUnion(likerName),
  });
};

export const dislikePitch = async (pitchId, dislikerName) => {
  await updateDoc(doc(db, "pitches", pitchId), {
    dislikes: arrayUnion(dislikerName),
    viewedBy: arrayUnion(dislikerName),
  });
};

export const getUserRole = async (userId) => {
  const userRole = await getDoc(doc(db, "users", userId));
  return userRole.data();
};

//TODO: Comment section
export const addComment = async (pitchId, comment) => {
  await updateDoc(doc(db, "pitches", pitchId), {
    comments: arrayUnion(comment),
  });
};

//skeleton code
export const deleteComment = async (pitchId, comment) => {
  await updateDoc(doc(db, "pitches", pitchId), {
    comments: arrayRemove(comment),
  });
};

export const getComments = async (pitchId) => {
  const pitchDoc = await getDoc(doc(db, "pitches", pitchId));
  if (pitchDoc.exists()) {
    const pitchData = pitchDoc.data();
    return pitchData.comments || [];
  } else {
    console.error("No such document exists");
    return [];
  }
};

export const editComment = async (pitchId, commentId, updatedComment) => {
  await updateDoc(doc(db, "pitches", pitchId), {
    comments: arrayUnion(updatedComment),
  });
  await deleteComment(pitchId, commentId);
};
