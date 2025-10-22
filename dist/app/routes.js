"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./api/user/user.route"));
const apiLog_route_1 = __importDefault(require("./api/apiLog/apiLog.route"));
const subscriber_route_1 = __importDefault(require("./api/subscriber/subscriber.route"));
const subscription_route_1 = __importDefault(require("./api/subscription/subscription.route"));
const task_route_1 = __importDefault(require("./api/task/task.route"));
// routes
const router = express_1.default.Router();
router.use("/users", user_route_1.default);
router.use("/call", apiLog_route_1.default);
router.use("/subscribe", subscriber_route_1.default);
router.use("/subscription", subscription_route_1.default);
router.use("/task", task_route_1.default);
exports.default = router;
