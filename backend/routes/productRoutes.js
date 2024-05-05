import express from "express";
// import products from '../data/products.js'
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//so we wil use async mechanism because the mongoose methods are asynchronous
//So we could wrap all this in a asyncHandeler of express.js so that we don't do try and catch
//But no, we will do ourselves without any third parties
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // This is gonna get all of the data
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // const product = products.find((p) => p._id == req.params.id);
    const product = await Product.findById(req.params.id);

    if (product) return res.json(product);

    res.status(404);
    throw new Error("Resource not found!"); // smtg cool to show in case of errors instead of html page
    // which makes no sense in case of json API  ==> makes things more elegent when it comes into handeling errors
  })
);

export default router;
