import mongoose from "mongoose"
const bannerSchema = new mongoose.Schema({
    tag: {
      type: String,
    },
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema)
export default Banner;