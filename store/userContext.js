import { useState, useEffect, useContext, createContext } from 'react';
import {
  FirebaseFacebookSignIn,
  FirebaseGoogleSignIn,
  FireBaseSignWithEmailandPass,
  FirebaseCreateUser,
  FirebaseSignOut,
  fsAuth,
  GetUserByID,
} from '../utils/firebase';

import { onAuthStateChanged } from 'firebase/auth';

const initialState = {
  user: null,
  cart: null,
  wishlist: null,
  login: (email, password) => {},
  logout: () => {},
  signInWithFaceBook: () => {},
  signInWithGoogle: () => {},
  registerWithEmailandPass: (userdata) => {},
  refreshToken: () => {},
  addToCart: (product) => {},
  removeCartItem: (product) => {},
};

const UserContext = createContext(initialState);

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fsAuth, async (currentUser) => {
      if (currentUser) {
        const user = await GetUserByID(currentUser.uid);
        setCart(user.cart);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const login = async (email, password) => {
    const user = await FireBaseSignWithEmailandPass(email, password);
    setUser(user);
    return user;
  };

  const logout = async () => {
    await FirebaseSignOut();
    setUser(null);
  };

  const signInWithFaceBook = async () => {
    await FirebaseFacebookSignIn();
  };

  const signInWithGoogle = async () => {
    await FirebaseGoogleSignIn();
  };

  const registerWithEmailandPass = async (userdata) => {
    await FirebaseCreateUser(userdata);
  };

  const removeCartItem = (product) => {
    const updatedCart = cart.filter(({ productid }) => {
      productid !== product.id;
    });
    setCart([...updatedCart]);
  };

  const addToCart = (product) => {
    let updatedProduct;
    let quantity = 1;
    let existingProduct;

    const existingProductIndex = cart.findIndex(({ productid }) => {
      return productid === product.id;
    });

    if (existingProductIndex >= 0) {
      updatedProduct = cart[existingProductIndex];
      updatedProduct.quantity = updatedProduct.quantity + 1;
      existingProduct = cart.filter(
        ({ productid }) => productid !== product.id
      );
      setCart([...existingProduct, updatedProduct]);
    } else {
      updatedProduct = { productid: product.id, quantity };
      setCart([...cart, updatedProduct]);
    }
  };

  const context = {
    user,
    cart,
    wishlist,
    login,
    logout,
    signInWithFaceBook,
    signInWithGoogle,
    registerWithEmailandPass,
    addToCart,
    removeCartItem,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

const useAuth = () => {
  return useContext(UserContext);
};

export { UserContext, UserContextProvider, useAuth };
