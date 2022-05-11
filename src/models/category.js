import mongoose from "mongoose"
const categorySchema = new mongoose.Schema({
    name: {
      type: String,
    },
    types: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TypeCategory',
      required: true
    }],
    quantity: [{
        type: Object
    }]
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema)

const TypeCategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const TypeCategory = mongoose.model("TypeCategory", TypeCategorySchema)
export {TypeCategory, Category};
