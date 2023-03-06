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
import { GetCartItems, AddCartItems, ResetCart } from '../store/api/cart';
import {
  GetWishLitsItems,
  AddWishLitsItems,
  ResetWishlist,
} from '../store/api/wishlist';
import {
  cartReducer,
  INITIALIZED,
  INITIALIZED_GUEST,
  ADD_TO_CART,
  RESET_CART,
  ADD_TO_WISHLIST,
  RESET_WISHLIST,
  LOGIN,
  LOGOUT,
} from './reducers/cart';

const initialState = {
  isInitialized: false,
  user: null,
  cart: [],
  cartItemCount: 0,
  wishlist: [],
  wishlistItemCount: 0,
  login: (email, password) => {},
  logout: () => {},
  signInWithFaceBook: () => {},
  signInWithGoogle: () => {},
  registerWithEmailandPass: (userdata) => {},
  registerWithGoogle: () => {},
  refreshToken: () => {},
  addToCart: (product) => {},
  removeCartItem: (product) => {},
  resetCart: () => {},
  toggleWishlist: (product) => {},
  resetWishlist: () => {},
};

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(
    () =>
      onAuthStateChanged(fsAuth, async (currentUser) => {
        if (currentUser) {
          const cart = await GetCartItems(currentUser.uid);
          const wishlist = await GetWishLitsItems(currentUser.uid);

          dispatch({
            type: INITIALIZED,
            payload: {
              user: currentUser,
              cart: cart.items.length > 0 ? cart.items : [],
              wishlist: wishlist.items.length > 0 ? wishlist.items : [],
              cartItemCount: cart ? cart.cartItemCount : 0,
              wishlistItemCount: wishlist ? wishlist.itemCount : 0,
              isInitialized: true,
            },
          });
        } else {
          const guestCart = Cookies.get('cart')
            ? JSON.parse(Cookies.get('cart'))
            : [];

          const guestwishlist = Cookies.get('wishlist')
            ? JSON.parse(Cookies.get('wishlist'))
            : [];

          console.log(guestCart);
          console.log(guestwishlist);

          dispatch({
            type: INITIALIZED_GUEST,
            payload: {
              cart: guestCart,
              cartItemCount: guestCart.length,
              wishlist: guestwishlist,
              wishlistItemCount: guestwishlist.length,
            },
          });
        }
      }),

    []
  );

  // console.log(state.wishlist);
  // console.log(state.cart);

  const login = async (email, password) => {
    const user = await FireBaseSignWithEmailandPass(email, password);
    dispatch({ type: LOGIN, payload: { user } });
  };

  const logout = async () => {
    await FirebaseSignOut();
    Cookies.remove('cart', { path: '' });
    Cookies.remove('wishlist', { path: '' });
    dispatch({
      type: LOGOUT,
    });
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

  const addToCart = async (product) => {
    let updatedProduct;
    let quantity = 1;
    let cartItemCount = 0;
    let existingProduct;

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
    } else {
      existingProduct = state.cart;
      updatedProduct = { productid: product.id, quantity };
      cartItemCount = state.cartItemCount + quantity;
    }
    let cart = [...existingProduct, updatedProduct];
    if (state.user) {
      await AddCartItems(state.user.uid, cart, cartItemCount);
    } else {
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

  const removeCartItem = (product) => {};

  const resetCart = async () => {
    if (state.user) {
      await ResetCart(state.user.uid);
    } else {
      Cookies.set('cart', JSON.stringify({ cart: [] }));
    }
    dispatch({ type: RESET_CART });
  };

  const toggleWishlist = async (product) => {
    let updatedProduct;
    let quantity = 1;
    let wishlistItemCount = 0;
    let existingProduct;
    let wishlist;

    console.log(state.wishlist);
    const existingProductIndex = state.wishlist.findIndex(({ productid }) => {
      return productid === product.id;
    });

    if (existingProductIndex === -1) {
      existingProduct = state.wishlist;
      updatedProduct = { productid: product.id };
      wishlistItemCount = state.wishlistItemCount + quantity;

      wishlist = [...existingProduct, updatedProduct];
    } else {
      wishlistItemCount = state.wishlistItemCount - quantity;
      updatedProduct = state.wishlist.filter(
        ({ productid }) => productid !== product.id
      );
      wishlist = [...updatedProduct];
    }
    if (state.user) {
      await AddWishLitsItems(state.user.uid, wishlist, wishlistItemCount);
    } else {
      Cookies.set('wishlist', JSON.stringify(wishlist));
    }

    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        wishlist,
        wishlistItemCount,
      },
    });
  };

  const resetWishlist = async () => {
    if (state.user) {
      await ResetWishlist(state.user.uid);
    } else {
      Cookies.set('wishlist', JSON.stringify({ wishlist: [] }));
    }
    dispatch({ type: RESET_WISHLIST });
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
    resetCart,
    toggleWishlist,
    resetWishlist,
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
