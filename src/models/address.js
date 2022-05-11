import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true
    },

    street: {
      type: String,
      required: true,
    },

    nameHouse: {
      type: String,
      required: true
    },

    provinceDistrictWard: {
      type: String,
      required: true,
    },

    postalCode: {
      type: Number,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  }, 
  {
    strict: true, 
    timestamps: true
  }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;