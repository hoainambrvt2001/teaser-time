import { setDoc, getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase.js';

const BOOKMARK_DOCUMENT = 'bookmarks';

export const addBookmark = async (userUid, bookmarkData) => {
  const docRef = doc(db, BOOKMARK_DOCUMENT, userUid);
  const docSnap = await getDoc(docRef);
  try {
    if (docSnap.exists()) {
      updateDoc(docRef, {
        Movie: arrayUnion(bookmarkData),
      });
    } else {
      setDoc(docRef, {
        Movie: [bookmarkData],
      });
    }
    return true;
  } catch (e) {
    console.log('[addBookmark] Failed to add bookmark: ' + e.message);
    return false;
  }
};

export const getBookmarks = async (userUid) => {
  const docRef = doc(db, BOOKMARK_DOCUMENT, userUid);
  const docSnap = await getDoc(docRef);
  let bookmarks = [];
  if (docSnap.exists()) {
    bookmarks = docSnap.data();
  }
  return bookmarks;
};
