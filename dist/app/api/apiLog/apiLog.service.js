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
exports.getApiLogsByKey = exports.getApiTodaysLogsByUser = exports.getApiLogsByUser = exports.getAllApiLogs = exports.getApiLogById = exports.deleteApiLog = exports.editApiLog = exports.updateApiLog = exports.createApiLog = void 0;
const sql_service_1 = require("../../common/services/sql.service");
// Create log entry
const createApiLog = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO api_log (userId, `key`, `date`, `time`) VALUES (?, ?, CURDATE(), CURTIME())";
    const values = [data.userId, data.key];
    const [result] = yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id: result.insertId }, data);
});
exports.createApiLog = createApiLog;
// Update log entry
const updateApiLog = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "UPDATE api_log SET userId = ?, `key` = ?, `date` = ?, `time` = ? WHERE id = ?";
    const values = [data.userId, data.key, data.date, data.time, id];
    yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id }, data);
});
exports.updateApiLog = updateApiLog;
// Edit log entry dynamically (partial update)
const editApiLog = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "UPDATE api_log SET ";
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
exports.editApiLog = editApiLog;
// Delete log entry
const deleteApiLog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM api_log WHERE id = ?";
    yield sql_service_1.pool.execute(query, [id]);
    return { id, deleted: true };
});
exports.deleteApiLog = deleteApiLog;
// Get log by ID
const getApiLogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, userId, `key`, `date`, `time` FROM api_log WHERE id = ?";
    const [rows] = yield sql_service_1.pool.execute(query, [id]);
    return rows[0] || null;
});
exports.getApiLogById = getApiLogById;
// Get all logs
const getAllApiLogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, userId, `key`, `date`, `time` FROM api_log";
    const [rows] = yield sql_service_1.pool.execute(query);
    return rows;
});
exports.getAllApiLogs = getAllApiLogs;
// Get all logs of a user
const getApiLogsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, userId, `key`, `date`, `time` FROM api_log WHERE userId = ?";
    const [rows] = yield sql_service_1.pool.execute(query, [userId]);
    return rows;
});
exports.getApiLogsByUser = getApiLogsByUser;
const getApiTodaysLogsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, userId, `key`, `date`, `time` FROM api_log FROM api_log WHERE userId = ? AND date = CURDATE()";
    const [rows] = yield sql_service_1.pool.execute(query, [userId]);
    return rows;
});
exports.getApiTodaysLogsByUser = getApiTodaysLogsByUser;
// Get logs by API key
const getApiLogsByKey = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, userId, `key`, `date`, `time` FROM api_log WHERE `key` = ?";
    const [rows] = yield sql_service_1.pool.execute(query, [key]);
    return rows;
});
exports.getApiLogsByKey = getApiLogsByKey;
