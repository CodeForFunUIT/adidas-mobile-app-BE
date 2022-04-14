import mongoose from "mongoose"
import { ProductType } from "../utils/enum.js"
import validator from "validator"
const productSchema = new mongoose.Schema({
    image: {
      type: String,
    },
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