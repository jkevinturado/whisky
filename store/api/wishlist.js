import axios from '../../utils/axios';

export const GetWishLitsItems = async (uid) => {
  try {
    const res = await axios.post(
      '/api/collections/wishlist',
      { userid: uid },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddWishLitsItems = async (uid, wishlist, wishlistItemCount) => {
  try {
    const res = await axios.post(
      '/api/collections/wishlist/add',
      { userid: uid, wishlist, wishlistItemCount },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const ResetWishlist = async (uid) => {
  try {
    const res = await axios.post(
      '/api/collections/wishlist/reset',
      { userid: uid },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
