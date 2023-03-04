import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  items: [
    {
      productid: {
        type: String,
        required: true,
        unique: true,
      },
      dateAdded: {
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
      },
    },
  ],
  itemCount: { type: Number, default: 0 },
});

const WishList =
  mongoose.models.WishList || mongoose.model('WishList', wishlistSchema);

export default WishList;
