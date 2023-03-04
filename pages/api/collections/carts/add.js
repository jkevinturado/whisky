import { connect, disconnect } from '../../../../utils/database';
import CartModel from '../../../../models/Cart';

export default async function handler(req, res) {
  await connect();

  try {
    const { userid, cart, cartItemCount } = req.body;
    const findCart = await CartModel.findOne({ userid }).exec();

    if (findCart) {
      await CartModel.updateOne({ userid }, { $set: { items: [] } });
      await CartModel.updateOne({ userid }, { $set: { items: cart } });
    } else {
      await CartModel.create({
        userid,
        items: cart,
        cartItemCount,
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
