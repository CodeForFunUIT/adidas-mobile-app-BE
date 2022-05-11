import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    orderTime: {
      type: String,
    },
    orderAddress: {
        type: String,
    },
    paymentMethod: {
      type: String,
    //   enum: Object.keys(ProductType).map((value) => {
    //     return ProductType[value];
    //   }),
    //   required: true
    },
    receptionName: {
        type: String,
        // default: 0
    },
    receptionPhone: {
      type: String,
      ref: 'User'
    },
    promotionId: {
        type: String,
    },
    total: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema)
export default Cart;