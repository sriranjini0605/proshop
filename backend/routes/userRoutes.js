import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
import {
  authUsers,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

router.route("/").post(registerUser).get(protect, admin, getUser);
router.post("/login", authUsers);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;
