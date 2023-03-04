import { useEffect, useContext, createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

import { onAuthStateChanged } from 'firebase/auth';
import {
  FirebaseFacebookSignIn,
  FirebaseGoogleSignIn,
  FireBaseSignWithEmailandPass,
  FirebaseCreateUser,
  FirebaseSignOut,
  FirebaseGoogleSignUp,
  fsAuth,
  GetUserByID,
  AddToCartDB,
  RemoveCartItemtoDB,
} from '../utils/firebase';
import { GetCartItems } from '../store/api/cart';
import {
  cartReducer,
  INITIALIZED,
  ADD_TO_CART,
  LOGIN,
  LOGOUT,
} from './reducers/cart';

const initialState = {
  isInitialized: false,
  user: null,
  cart: [],
  cartItemCount: 0,
  wishlist: null,
  login: (email, password) => {},
  logout: () => {},
  signInWithFaceBook: () => {},
  signInWithGoogle: () => {},
  registerWithEmailandPass: (userdata) => {},
  registerWithGoogle: () => {},
  refreshToken: () => {},
  addToCart: (product) => {},
  removeCartItem: (product) => {},
};

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(
    () =>
      onAuthStateChanged(fsAuth, async (currentUser) => {
        if (currentUser) {
          // const cart = await GetCartItems(currentUser.uid);
          dispatch({
            type: INITIALIZED,
            // payload: { user: currentUser, cart, isInitialized: true },
            payload: { user: currentUser, isInitialized: true },
          });
        } else {
          const guessCart = Cookies.get('cart')
            ? JSON.parse(Cookies.get('cart'))
            : [];

          dispatch({ type: LOGOUT, payload: { cart: guessCart } });
        }
      }),

    []
  );
  console.log(state.cart);

  const login = async (email, password) => {
    const user = await FireBaseSignWithEmailandPass(email, password);
    dispatch({ type: LOGIN, payload: { user } });
  };

  const logout = async () => {
    await FirebaseSignOut();
    const guessCart = Cookies.get('cart')
      ? JSON.parse(Cookies.get('cart'))
      : [];
    dispatch({ type: LOGOUT, payload: { cart: guessCart } });
  };

  const signInWithFaceBook = async () => {
    await FirebaseFacebookSignIn();
  };

  const signInWithGoogle = async () => {
    const user = await FirebaseGoogleSignIn();
    dispatch({ type: LOGIN, payload: { user } });
  };

  const registerWithEmailandPass = async (userdata) => {
    const user = await FirebaseCreateUser(userdata);
    dispatch({ type: LOGIN, payload: { user } });
  };

  const registerWithGoogle = async () => {
    const user = await FirebaseGoogleSignUp();
    dispatch({ type: LOGIN, payload: { user } });
  };

  const removeCartItem = (product) => {
    const updatedCart = cart.filter(({ productid }) => {
      productid !== product.id;
    });
    setCart([...updatedCart]);
  };

  const addToCart = async (product) => {
    let updatedProduct;
    let quantity = 1;
    let cartItemCount = 0;
    let existingProduct;

    console.log(state.cart);

    const existingProductIndex = state.cart.findIndex(({ productid }) => {
      return productid === product.id;
    });

    if (existingProductIndex >= 0) {
      updatedProduct = state.cart[existingProductIndex];
      updatedProduct.quantity = updatedProduct.quantity + quantity;
      cartItemCount = state.cartItemCount + quantity;
      existingProduct = state.cart.filter(
        ({ productid }) => productid !== product.id
      );
      // await RemoveCartItemtoDB(user.uid, product.id);
      // await AddToCartDB(updatedProduct, user.uid);
      // setCart([...existingProduct, updatedProduct]);
    } else {
      existingProduct = state.cart;
      updatedProduct = { productid: product.id, quantity };
      cartItemCount = state.cartItemCount + quantity;
      // setCart([...cart, updatedProduct]);
      // await AddToCartDB(updatedProduct, user.uid);
    }

    let cart = [...existingProduct, updatedProduct];
    if (!state.user) {
      Cookies.set('cart', JSON.stringify(cart));
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        cart,
        cartItemCount,
      },
    });
  };

  const context = {
    ...state,
    login,
    logout,
    signInWithFaceBook,
    signInWithGoogle,
    registerWithEmailandPass,
    registerWithGoogle,
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
