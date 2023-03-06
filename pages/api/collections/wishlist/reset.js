import { connect, disconnect } from '../../../../utils/database';
import WishlistModel from '../../../../models/Wishlist';

export default async function handler(req, res) {
  await connect();

  try {
    const { userid } = req.body;

    await WishlistModel.updateOne(
      { userid },
      { $set: { items: [], itemCount: 0 } }
    );
    res.status(200).json({ status: true });

    disconnect();
  } catch (error) {
    console.log(error);
    disconnect();
    res.status(500).json({ status: 'error', message: error });
  }
}
