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
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REMOVE_TO_CART = 'REMOVE_TO_CART';
export const REGISTER = 'REGISTER';
export const INITIALIZED = 'INITIALIZED';

const initialState = {
  isInitialized: false,
  user: null,
  cart: [],
  cartItemCount: 0,
  wishlist: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED: {
      const { user, cart } = action.payload;
      return { ...state, user, cart, isInitialized: true };
    }
    case LOGIN: {
      const { user } = action.payload;
      return { ...state, user, isInitialized: true };
    }
    case LOGOUT: {
      const { cart } = action.payload;
      return {
        ...state,
        user: null,
        cart,
        wishlist: null,
        isInitialized: false,
      };
    }
    case ADD_TO_CART: {
      const { cart, cartItemCount } = action.payload;
      return { ...state, cart, cartItemCount };
    }
    default:
      return state;
  }
};

export { cartReducer };
