import { connect, disconnect } from '../../../../utils/database';
import CartModel from '../../../../models/Cart';

export default async function handler(req, res) {
  await connect();

  try {
    const { userid } = req.body;
    const cart = await CartModel.find({ userid }).exec();
    res.status(200).json(cart);

    await disconnect();
  } catch (error) {
    console.log(error);
    await disconnect();
    res.status(500).json({ status: 'error', message: error });
  }
}
