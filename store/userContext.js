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
  RemoveCartItemtoDB,
} from '../utils/firebase';
import { GetCartItems, AddCartItems, ResetCart } from '../store/api/cart';
import {
  GetWishLitsItems,
  AddWishLitsItems,
  ResetWishlist,
} from '../store/api/wishlist';
import {
  userReducer,
  INITIALIZED,
  INITIALIZED_GUEST,
  UPDATE_CART,
  REMOVE_TO_CART,
  RESET_CART,
  ADD_TO_WISHLIST,
  RESET_WISHLIST,
  REMOVE_TO_WISHLIST,
  LOGIN,
  LOGOUT,
} from './reducers/user';

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
  updateCartItem: (product) => {},
  removeCartItem: (product) => {},
  resetCart: () => {},
  toggleWishlist: (product) => {},
  removeWishlistItem: (id) => {},
  resetWishlist: () => {},
};

const UserContext = createContext();

const getCartItemCout = (cart) => {
  let count =
    cart.length > 0
      ? cart.reduce((acc, o) => acc + parseInt(o.quantity), 0)
      : 0;
  return count;
};

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

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

          dispatch({
            type: INITIALIZED_GUEST,
            payload: {
              cart: guestCart,
              cartItemCount: getCartItemCout(guestCart),
              wishlist: guestwishlist.wishlist,
              wishlistItemCount: guestwishlist.wishlist.length,
            },
          });
        }
      }),

    [dispatch]
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

  const updateCartItem = async (id, quantity) => {
    let updatedProduct;
    let cartItemCount = 0;
    let existingProduct;
    let updatedCart;
    console.log(state.cart);
    const existingProductIndex = state.cart.findIndex(({ productid }) => {
      return productid === id;
    });

    if (existingProductIndex >= 0) {
      updatedProduct = state.cart[existingProductIndex];
      updatedProduct.quantity = updatedProduct.quantity + quantity;
      console.log(updatedProduct.quantity);
      existingProduct = state.cart.filter(({ productid }) => productid !== id);
      if (updatedProduct.quantity === 0) {
        updatedCart = [...existingProduct];
      } else {
        updatedCart = [...existingProduct, updatedProduct];
      }
    } else {
      existingProduct = state.cart;
      updatedProduct = { productid: id, quantity };
      updatedCart = [...existingProduct, updatedProduct];
    }
    console.log(updatedCart);
    cartItemCount = getCartItemCout(updatedCart);
    if (state.user) {
      await AddCartItems(state.user.uid, updatedCart, cartItemCount);
    } else {
      Cookies.set('cart', JSON.stringify(updatedCart));
    }

    console.log(updatedCart);
    dispatch({
      type: UPDATE_CART,
      payload: {
        updatedCart,
        cartItemCount,
      },
    });
  };

  const removeCartItem = async (id) => {
    const cart = state.cart.filter(({ productid }) => productid !== id);
    const cartItemCount = getCartItemCout(cart);

    if (state.user) {
      await AddCartItems(state.user.uid, cart, cartItemCount);
    } else {
      Cookies.set('cart', JSON.stringify(cart));
    }

    dispatch({
      type: REMOVE_TO_CART,
      payload: {
        cart,
        cartItemCount,
      },
    });
  };

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

  const removeWishlistItem = async (id) => {
    const wishlist = state.wishlist.filter(({ productid }) => productid !== id);
    const wishlistItemCount = getCartItemCout(wishlist);
    console.log(wishlistItemCount, wishlist);

    if (state.user) {
      await AddWishLitsItems(state.user.uid, wishlist, wishlistItemCount);
    } else {
      Cookies.set('wishlist', JSON.stringify(wishlist));
    }

    dispatch({
      type: REMOVE_TO_WISHLIST,
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
    updateCartItem,
    removeCartItem,
    resetCart,
    toggleWishlist,
    removeWishlistItem,
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
