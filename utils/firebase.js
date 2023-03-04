import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { firebaseConfig } from '../config';

export const firebase = initializeApp(firebaseConfig);
export const fsAuth = getAuth(firebase);
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
export const FirebaseCreateUser = async (userdata) => {
  try {
    const { email, password, firstName, lastName, birthdate, gender } =
      userdata;
    const res = await createUserWithEmailAndPassword(fsAuth, email, password);

    const {
      user: { uid, providerId, accessToken, refreshToken },
      _tokenResponse: { localId, idToken, expiresIn },
    } = res;

    await FirebaseSaveUsertoDB({
      ...userdata,
      id: uid || localId,
      provider: providerId,
      firstname: firstName,
      lastname: lastName,
      fullname: `${firstName.trim()} ${lastName.trim()}`,
      profilePicURL: null,
      birthdate,
      gender,
      email,
      password,
      token: accessToken || idToken,
      refreshToken,
      tokenExpiration: expiresIn,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const FireBaseSignWithEmailandPass = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(fsAuth, email, password);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const FirebaseGoogleSignIn = async () => {
  try {
    const res = await signInWithPopup(fsAuth, fsGoogleProvider);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const FirebaseGoogleSignUp = async () => {
  try {
    const res = await signInWithPopup(fsAuth, fsGoogleProvider);

    const {
      providerId,
      user: { uid, accessToken, displayName, refreshToken, photoURL },
      _tokenResponse: {
        localId,
        lastName,
        firstName,
        fullName,
        email,
        idToken,
        expiresIn,
      },
    } = res;

    const userdata = {
      id: uid || localId,
      provider: providerId,
      firstname: firstName || null,
      lastname: lastName || null,
      fullname: displayName || fullName,
      gender: null,
      birthdate: null,
      email,
      password: null,
      token: accessToken || idToken,
      refreshToken,
      tokenExpiration: expiresIn || null,
      profilePicURL: photoURL || null,
    };
    await FirebaseSaveUsertoDB(userdata);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const FirebaseSignOut = async () => {
  try {
    const res = await signOut(fsAuth);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const FirebaseFacebookSignIn = async () => {
  try {
    const res = await signInWithPopup(fsAuth, fsFacebookProvider);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//database crud
const FirebaseSaveUsertoDB = async (userdata) => {
  try {
    const {
      id,
      provider,
      firstname,
      lastname,
      fullname,
      gender,
      birthdate,
      email,
      password,
      token,
      refreshToken,
      tokenExpiration,
      profilePicURL,
    } = userdata;

    await setDoc(doc(fsDB, 'users', id), {
      provider,
      firstname,
      lastname,
      fullname,
      profilePicURL,
      gender,
      birthdate,
      email,
      password,
      token,
      refreshToken,
      tokenExpiration,
      //default columns
      cart: [],
      createdAt: new Date(),
      updatedAt: null,
      isActive: true,
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

export const AddToCartDB = async (cart, userid) => {
  try {
    const userRef = doc(fsDB, 'users', userid);
    const res = await updateDoc(userRef, { cart: arrayUnion(cart) });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const RemoveCartItemtoDB = async (userid, productid) => {
  try {
    const userRef = doc(fsDB, 'users', userid);
    const res = await updateDoc(userRef, { cart: arrayRemove() });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const GetFirebaseUsersDB = async () => {
  try {
    const data = await getDocs(userCollection);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GetUserByID = async (id) => {
  try {
    const userRef = doc(fsDB, 'users', id);
    const responsedata = await getDoc(userRef);

    return responsedata.data();
  } catch (error) {
    console.log(error);
  }
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
