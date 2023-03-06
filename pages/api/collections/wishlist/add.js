import { connect, disconnect } from '../../../../utils/database';
import WishlistModel from '../../../../models/Wishlist';

export default async function handler(req, res) {
  await connect();

  try {
    const { userid, wishlist, wishlistItemCount } = req.body;

    const findExisting = await WishlistModel.findOne({
      userid: userid,
    }).exec();

    if (findExisting) {
      await WishlistModel.updateOne(
        { userid },
        { $set: { items: wishlist, itemCount: wishlistItemCount } }
      );
    } else {
      await WishlistModel.create({
        userid,
        items: wishlist,
        itemCount: wishlistItemCount,
      });
    }
    res.status(200).json({ status: true });
    disconnect();
  } catch (error) {
    console.log(error);
    disconnect();
    res.status(500).json({ status: 'error', message: error });
  }
}
