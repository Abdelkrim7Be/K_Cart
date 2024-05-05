import mongoose from "mongoose";

// The review's Schema
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

// every product needs to be connected to a user
/**mongoose.Schema.Types.ObjectId: This is a built-in Mongoose schema type for storing 
 * MongoDB ObjectIds. MongoDB uses ObjectIds as unique identifiers for documents in a 
 * collection. By specifying this type, you're indicating that the user field will
 *  store MongoDB ObjectIds.
So, in summary, the type field in the schema definition specifies the data type 
that will be stored in the user field, and in this case, it's ObjectIds. */

// The product Schema
const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// I'm creating a Mongoose model named Product based on the productSchema schema. 
const Product = mongoose.model("Product", productSchema);

export default Product;
