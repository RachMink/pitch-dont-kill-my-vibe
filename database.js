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
};

export const getSpecificPitch = async (pitchId) => {
  const pitch = await getDoc(doc(db, "pitches", pitchId));

  return {
    id: pitch.id,
    ...pitch.data(),
  };
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

export const editPitch = async (pitchId, newData ) => {
  await updateDoc(doc(db, "pitches", pitchId), {
     pitchDescription: newData.pitchDescription,
     pitchTitle: newData.pitchTitle,
   });
  return { success: true, message: "Pitch updated successfully" };
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

export const editComment = async (pitchId, comment, newData) => {
   // Get the current comments of the pitch
   const pitchComments = await getComments(pitchId);

   // Find the index of the comment to edit
   const commentIndex = pitchComments.findIndex(
     (commentindb) => commentindb.commentId === comment
   );

   // Check if the comment with the specified ID exists
   if (commentIndex !== -1) {
     // Update the comment body with the new data
     pitchComments[commentIndex].commentBody = newData.commentBody;

     // Update the comment in the database
     await updateDoc(doc(db, "pitches", pitchId), {
       comments: pitchComments,
     });

     return { success: true, message: "Comment updated successfully" };
   }
}; 
