import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// All of these routes are connected to '/api/users'
// if it is a post request it is : post(registerUser) and if it is a get users request it is : get(getUsers)
router.route("/").post(registerUser).get(protect, admin, getUsers); //u can't just be logged in ,
//  and also, you gotta be an admin
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, getUserByID)
  .put(protect, updateUser);

export default router;
