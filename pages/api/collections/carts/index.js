import { MongoClient } from 'mongodb';
import { mongoDbURI } from '../../../../config';
import { useAuth } from '../../../../store/userContext';

export default async function handler(req, res) {
  const client = await MongoClient.connect(mongoDbURI);
  const db = client.db();

  try {
    let cart;
    if (req.method === 'GET') {
      const { userid } = req.body;
      //   data = db.collection('cartitems');
      cart = await db.collection('cartitems').findOne({ userid });
      console.log(cart);
      //   console.log(data[0]);
    }
    client.close();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    client.close();
    res.status(500).json({ status: 'error', message: error });
  }
}
