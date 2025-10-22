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
exports.getTasksByRole = exports.getAllTasks = exports.getTaskById = exports.deleteTask = exports.editTask = exports.updateTask = exports.createTask = void 0;
const sql_service_1 = require("../../common/services/sql.service");
// Create task
const createTask = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO task (role, content) VALUES (?, ?)";
    const values = [data.role, data.content];
    const [result] = yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id: result.insertId }, data);
});
exports.createTask = createTask;
// Update task (all fields)
const updateTask = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "UPDATE task SET role = ?, content = ? WHERE id = ?";
    const values = [data.role, data.content, id];
    yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id }, data);
});
exports.updateTask = updateTask;
// Edit task dynamically (partial update)
const editTask = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "UPDATE task SET ";
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
exports.editTask = editTask;
// Delete task
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM task WHERE id = ?";
    yield sql_service_1.pool.execute(query, [id]);
    return { id, deleted: true };
});
exports.deleteTask = deleteTask;
// Get task by ID
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, role, content FROM task WHERE id = ?";
    const [rows] = yield sql_service_1.pool.execute(query, [id]);
    return rows[0] || null;
});
exports.getTaskById = getTaskById;
// Get all tasks
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, role, content FROM task";
    const [rows] = yield sql_service_1.pool.execute(query);
    return rows;
});
exports.getAllTasks = getAllTasks;
// Get tasks by role
const getTasksByRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT id, role, content FROM task WHERE role = ?";
    const [rows] = yield sql_service_1.pool.execute(query, [role]);
    return rows;
});
exports.getTasksByRole = getTasksByRole;
