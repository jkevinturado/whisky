import {
  FirebaseFacebookSignIn,
  FirebaseGoogleSignIn,
  FireBaseSignWithEmailandPass,
  FirebaseCreateUser,
  FirebaseSignOut,
  fsAuth,
  GetUserByID,
  AddToCartDB,
  RemoveCartItemtoDB,
} from '../../utils/firebase';
import { GetCartItems } from '../../store/api/cart';

export const ADD_TO_CART = 'ADD_TO_CART';
export const RESET_CART = 'RESET_CART';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const RESET_WISHLIST = 'RESET_WISHLIST';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REMOVE_TO_CART = 'REMOVE_TO_CART';
export const REGISTER = 'REGISTER';
export const INITIALIZED = 'INITIALIZED';
export const INITIALIZED_GUEST = 'INITIALIZED_GUEST';

const initialState = {
  isInitialized: false,
  user: null,
  cart: [],
  cartItemCount: 0,
  wishlist: null,
  wishlistItemCount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED: {
      const { user, cart, cartItemCount, wishlist, wishlistItemCount } =
        action.payload;
      return {
        ...state,
        user,
        cart,
        cartItemCount,
        wishlist,
        wishlistItemCount,
        isInitialized: true,
      };
    }
    case INITIALIZED_GUEST: {
      const { cart, cartItemCount, wishlist, wishlistItemCount } =
        action.payload;
      return {
        ...state,
        cart,
        cartItemCount,
        wishlist,
        wishlistItemCount,
        isInitialized: true,
      };
    }
    case LOGIN: {
      const { user } = action.payload;
      return { ...state, user, isInitialized: true };
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
        cart: null,
        cartItemCount: 0,
        wishlist: null,
        wishlistItemCount: 0,
        isInitialized: false,
      };
    }
    case ADD_TO_CART: {
      const { cart, cartItemCount } = action.payload;
      return { ...state, cart, cartItemCount };
    }
    case RESET_CART: {
      return { ...state, cart: [], cartItemCount: 0 };
    }
    case ADD_TO_WISHLIST: {
      const { wishlist, wishlistItemCount } = action.payload;
      return { ...state, wishlist, wishlistItemCount };
    }
    case RESET_WISHLIST: {
      return { ...state, wishlist: [], wishlistItemCount: 0 };
    }
    default:
      return state;
  }
};

export { cartReducer };
