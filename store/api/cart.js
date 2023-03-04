import axios from '../../utils/axios';
import { useAuth } from '../../store/userContext';

export const GetCartItems = async (uid) => {
  try {
    const res = await axios.get(
      '/api/collections/carts',
      { userid: uid },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
