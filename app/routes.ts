import express from "express";
import userRoutes from "./api/user/user.route";
import apiLogRoutes from "./api/apiLog/apiLog.route";
import subscriberRoutes from "./api/subscriber/subscriber.route";
import subscriptionRoutes from "./api/subscription/subscription.route";
import taskRoutes from "./api/task/task.route";

// routes
const router = express.Router();
router.use("/users", userRoutes);
router.use("/call", apiLogRoutes);
router.use("/subscribe", subscriberRoutes);
router.use("/subscription", subscriptionRoutes);
router.use("/task", taskRoutes);

export default router;
