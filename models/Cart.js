import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  items: [
    {
      productid: {
        type: String,
        required: true,
        unique: true,
      },
      quantity: { type: Number, required: true },
      dateAdded: {
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
      },
    },
  ],
  cartItemCount: { type: Number, default: 0 },
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
