import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Allows us to protect routes for users that are registered
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // read the JWT from the cookie
  token = req.cookies.jwt; //jwt because we called it like this in  res.cookie('jwt', token, {...} in the
  // userController, if we called it something else, we'd type it instead of jwt

  if (token) {
    // we want to decode the userId from the token
    try {
      //  decode is now an object that contains the userId field
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //  because :  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      req.user = await User.findById(decode.userId).select("-password"); //excluding the password field because it's included
      next(); //As saying : we're done here , move on to the next middleware
      // IMPORTANT : now this user object is gonna be in the req object in all of our routes
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed!");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token!");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
