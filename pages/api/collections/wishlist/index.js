import { connect, disconnect } from '../../../../utils/database';
import WishlistModel from '../../../../models/Wishlist';

export default async function handler(req, res) {
  await connect();

  try {
    const { userid } = req.body;
    const wishlist = await WishlistModel.findOne({ userid }).exec();
    res.status(200).json(wishlist);
    await disconnect();
  } catch (error) {
    console.log(error);
    await disconnect();
    res.status(500).json({ status: 'error', message: error });
  }
}
