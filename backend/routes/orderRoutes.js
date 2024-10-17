import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders,
} from "../controller/orderController.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getAllOrders);
router.route('/mine').get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;