import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    introduction: {
      type: String,
    },
    images: [{
      type: String,
    }],
    price: {
        type: Number,
        required: true,
        validate: (value) => {
          if(isNaN(value)){
            throw new Error('Invalid price')
          }
        }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    tag: {
      type: String,
    },
    favorites: {
        type: Number,
        default: 0
    },
    isFav: {
      type: Boolean,
      default: false
  },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema)
export default Product;