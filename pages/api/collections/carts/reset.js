import { connect, disconnect } from '../../../../utils/database';
import CartModel from '../../../../models/Cart';

export default async function handler(req, res) {
  await connect();

  try {
    const { userid } = req.body;

    await CartModel.updateOne(
      { userid },
      { $set: { items: [], cartItemCount: 0 } }
    );
    res.status(200).json({ status: true });

    disconnect();
  } catch (error) {
    console.log(error);
    disconnect();
    res.status(500).json({ status: 'error', message: error });
  }
}
