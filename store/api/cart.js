import axios from '../../utils/axios';
import { useAuth } from '../../store/userContext';

export const GetCartItems = async (uid) => {
  try {
    const res = await axios.get(
      '/api/collections/carts',
      { userid: uid },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddCartItems = async (uid, cart, cartItemCount) => {
  try {
    const res = await axios.post(
      '/api/collections/carts/add',
      { userid: uid, cart, cartItemCount },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
