import axios from '../../utils/axios';

export const GetCartItems = async (uid) => {
  try {
    const res = await axios.post(
      '/api/collections/carts/',
      { userid: uid },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data;
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
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const ResetCart = async (uid) => {
  try {
    const res = await axios.post(
      '/api/collections/carts/reset',
      { userid: uid },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
