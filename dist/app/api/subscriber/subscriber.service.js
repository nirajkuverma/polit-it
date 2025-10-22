"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateFromToday = exports.getUpdateSubscription = exports.getMySubscriptionDetail = exports.getUsersBySubscription = exports.getSubscriptionsByUser = exports.getAllSubscribers = exports.getSubscriberById = exports.deleteSubscriber = exports.editSubscriber = exports.updateSubscriber = exports.createSubscriber = void 0;
const sql_service_1 = require("../../common/services/sql.service");
// Create a new subscriber (assign subscription to user)
const createSubscriber = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO subscriber (userId, subId, isExpired ) VALUES (?, ?, ?)";
    const values = [
        data.userId,
        data.subId,
        (0, exports.getDateFromToday)(Number(data.isExpired)),
    ];
    const [result] = yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id: result.insertId }, data);
});
exports.createSubscriber = createSubscriber;
// Update a subscriber
const updateSubscriber = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "UPDATE subscriber SET userId = ?, subId = ?, isExpired = ? WHERE id = ?";
    const values = [
        data.userId,
        data.subId,
        (0, exports.getDateFromToday)(Number(data.isExpired)),
        id,
    ];
    yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id }, data);
});
exports.updateSubscriber = updateSubscriber;
// Edit subscriber dynamically (partial update)
const editSubscriber = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "UPDATE subscriber SET ";
    const updates = [];
    const values = [];
    Object.keys(data).forEach((key) => __awaiter(void 0, void 0, void 0, function* () {
        updates.push(`${key} = ?`);
        if (key === "isExpired") {
            values.push(yield (0, exports.getDateFromToday)(Number(data[key])));
        }
        else {
            values.push(data[key]);
        }
    }));
    query += updates.join(", ") + " WHERE id = ?";
    values.push(id);
    yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id }, data);
});
exports.editSubscriber = editSubscriber;
// Delete subscriber
const deleteSubscriber = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM subscriber WHERE id = ?";
    yield sql_service_1.pool.execute(query, [id]);
    return { id, deleted: true };
});
exports.deleteSubscriber = deleteSubscriber;
// Get subscriber by ID
const getSubscriberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, userId, subId, isExpired FROM subscriber WHERE id = ?";
    const [rows] = yield sql_service_1.pool.execute(query, [id]);
    return rows[0] || null;
});
exports.getSubscriberById = getSubscriberById;
// Get all subscribers
const getAllSubscribers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, userId, subId, isExpired FROM subscriber";
    const [rows] = yield sql_service_1.pool.execute(query);
    return rows;
});
exports.getAllSubscribers = getAllSubscribers;
// Get all subscriptions of a user
const getSubscriptionsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT s.id, s.title, s.description, s.api_call, s.amount, b.isExpired
    FROM subscription s
    JOIN subscriber sb ON sb.subId = s.id
    WHERE sb.userId = ?`;
    const [rows] = yield sql_service_1.pool.execute(query, [userId]);
    return rows;
});
exports.getSubscriptionsByUser = getSubscriptionsByUser;
// Get all users of a subscription
const getUsersBySubscription = (subId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT u.id, u.email
    FROM user u
    JOIN subscriber sb ON sb.userId = u.id
    WHERE sb.subId = ?`;
    const [rows] = yield sql_service_1.pool.execute(query, [subId]);
    return rows;
});
exports.getUsersBySubscription = getUsersBySubscription;
const getMySubscriptionDetail = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT b.*, a.isExpired FROM subscriber a left join subscription b on b.id = a.subId WHERE userId = ? order by a.id desc limit 1";
    const [rows] = yield sql_service_1.pool.execute(query, [userId]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
    }
    return null;
});
exports.getMySubscriptionDetail = getMySubscriptionDetail;
// Get the current Subscription, If Subscription expired add new subscription to free.
const getUpdateSubscription = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentSub = yield (0, exports.getMySubscriptionDetail)(userId);
    const today = new Date();
    const subExpiry = (currentSub === null || currentSub === void 0 ? void 0 : currentSub.isExpired)
        ? new Date(currentSub.isExpired)
        : null;
    // If no subscription or expired
    if (!subExpiry || subExpiry < today) {
        // Get default free subscription
        const defaultSubscription = "SELECT * FROM subscription WHERE id = ?";
        const [rows] = yield sql_service_1.pool.execute(defaultSubscription, [
            1,
        ]);
        if (Array.isArray(rows) && rows.length > 0) {
            const defaultSub = rows[0];
            // Expiry = today + 15 days
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + Number(defaultSub.day));
            // Create new subscriber
            const res = yield (0, exports.createSubscriber)({
                userId,
                subId: defaultSub.id,
                isExpired: String(expiryDate), // pass expiry date
            });
            return res; // return newly created subscription
        }
    }
    return currentSub; // still active, return current subscription
});
exports.getUpdateSubscription = getUpdateSubscription;
const getDateFromToday = (offsetDays) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const result = new Date(today);
    // Add or subtract days
    result.setDate(today.getDate() + offsetDays);
    // Format as DD/MM/YYYY
    const dd = String(result.getDate()).padStart(2, "0");
    const mm = String(result.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const yyyy = result.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
});
exports.getDateFromToday = getDateFromToday;
