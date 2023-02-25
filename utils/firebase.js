import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  getDocs,
  getDoc,
  collection,
  query,
  doc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { firebaseConfig } from '../config';

const firebase = initializeApp(firebaseConfig);
const fsAuth = getAuth(firebase);
const fsDB = getFirestore(firebase);
const fsStorage = getStorage(firebase);
const fsGoogleProvider = new GoogleAuthProvider();
const fsFacebookProvider = new FacebookAuthProvider();

//database collection
export const userCollection = collection(fsDB, 'users');
export const productCollection = collection(fsDB, 'products');

// firebase storage management
export const fileUpload = async (folder, file) => {
  if (!file) return;
  const fileFolderRef = ref(fsStorage, `${folder}/${file.name}`);
  try {
    const response = await uploadBytes(fileFolderRef, file);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getImageFireStorage = async (imgpath) => {
  try {
    const url = await getDownloadURL(ref(fsStorage, imgpath));
    return url;
  } catch (error) {
    console.log(error);
  }
};

//auth
export const FirebaseCreateUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(fsAuth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const FireBaseSignWithEmailandPass = async (email, password) => {
  try {
    await signInWithEmailAndPassword(fsAuth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const FirebaseGoogleSignIn = async () => {
  try {
    await signInWithPopup(fsAuth, fsGoogleProvider);
  } catch (error) {
    console.log(error);
  }
};

export const FirebaseFacebookSignIn = async () => {
  try {
    await signInWithPopup(fsAuth, fsFacebookProvider);
  } catch (error) {
    console.log(error);
  }
};

//database crud
export const FirebaseSaveUsertoDB = async ({
  firstName,
  lastName,
  birthdate,
  gender,
  email,
  password,
}) => {
  try {
    await addDoc(userCollection, {
      firstname: firstName,
      lastname: lastName,
      gender,
      birthdate,
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};

export const FirebaseSaveProducttoDB = async (productdata) => {
  try {
    await addDoc(productCollection, productdata);
  } catch (error) {
    console.log(error);
  }
};

export const GetFirebaseUsersDB = async () => {
  try {
    const data = await getDocs(userCollection);
    return data;
  } catch (error) {}
};

export const GetFirebaseProductsDB = async () => {
  try {
    const responsedata = await getDocs(productCollection);
    let data = responsedata.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return data;
  } catch (error) {}
};

export const GetFirebaseProductsById = async (id) => {
  try {
    // const q = query(collection(fsDB, 'products'), where('id', '==', id));
    const productRef = doc(fsDB, 'products', id);
    const responsedata = await getDoc(productRef);

    return responsedata.data();
  } catch (error) {}
};

export const GetFirebaseCurrentUser = () => {
  try {
    const currentUser = fsAuth?.currentUser;
    return currentUser;
  } catch (error) {
    console.log(error);
  }
};
