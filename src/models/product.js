import mongoose from "mongoose"
import { ProductType } from "../utils/enum.js"
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
    type: {
      type: Number,
      enum: Object.keys(ProductType).map((value) => {
        return ProductType[value];
      }),
      required: true
    },
    favorites: {
        type: Number,
        default: 0
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema)
export default Product;