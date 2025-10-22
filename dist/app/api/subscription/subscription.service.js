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
exports.getSubscriptionByTitle = exports.getAllSubscriptions = exports.getSubscriptionById = exports.deleteSubscription = exports.editSubscription = exports.updateSubscription = exports.createSubscription = void 0;
const sql_service_1 = require("../../common/services/sql.service");
const createSubscription = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO subscription (title, description, api_call, amount, day) VALUES (?, ?, ?, ?, ?)";
    const values = [
        data.title,
        data.description,
        data.api_call,
        data.amount,
        data.day,
    ];
    const [result] = yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id: result.insertId }, data);
});
exports.createSubscription = createSubscription;
const updateSubscription = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "UPDATE subscription SET title = ?, description = ?, api_call = ?, amount = ?, day = ? WHERE id = ?";
    const values = [
        data.title,
        data.description,
        data.api_call,
        data.amount,
        data.day,
        id,
    ];
    yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id }, data);
});
exports.updateSubscription = updateSubscription;
const editSubscription = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "UPDATE subscription SET ";
    const updates = [];
    const values = [];
    Object.keys(data).forEach((key) => {
        updates.push(`${key} = ?`);
        values.push(data[key]);
    });
    query += updates.join(", ") + " WHERE id = ?";
    values.push(id);
    yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id }, data);
});
exports.editSubscription = editSubscription;
const deleteSubscription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM subscription WHERE id = ?";
    yield sql_service_1.pool.execute(query, [id]);
    return { id, deleted: true };
});
exports.deleteSubscription = deleteSubscription;
const getSubscriptionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, title, description, api_call, amount, day FROM subscription WHERE id = ?";
    const [rows] = yield sql_service_1.pool.execute(query, [id]);
    return rows[0] || null;
});
exports.getSubscriptionById = getSubscriptionById;
const getAllSubscriptions = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, title, description, api_call, amount, day FROM subscription";
    const [rows] = yield sql_service_1.pool.execute(query);
    return rows;
});
exports.getAllSubscriptions = getAllSubscriptions;
const getSubscriptionByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield sql_service_1.pool.execute("SELECT * FROM subscription WHERE title = ?", [title]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
    }
    return null;
});
exports.getSubscriptionByTitle = getSubscriptionByTitle;
