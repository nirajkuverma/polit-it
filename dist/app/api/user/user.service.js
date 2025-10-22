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
exports.getUserByEmail = exports.getAllUsers = exports.getUserById = exports.deleteUser = exports.editUser = exports.updateUser = exports.createUser = void 0;
const sql_service_1 = require("../../common/services/sql.service");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO users (name, email, phone, type, password) VALUES (?, ?, ?, ?, ?)";
    const values = [
        data.name,
        data.email,
        data.phone,
        data.type,
        data.password || null,
    ];
    const [result] = yield sql_service_1.pool.execute(query, values);
    return { userId: result.insertId };
});
exports.createUser = createUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "UPDATE users SET name = ?, email = ?, phone = ?, type = ?, password = ? WHERE id = ?";
    const values = [
        data.name,
        data.email,
        data.phone,
        data.type,
        data.password || null,
        id,
    ];
    yield sql_service_1.pool.execute(query, values);
    return Object.assign({ id }, data);
});
exports.updateUser = updateUser;
const editUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "UPDATE users SET ";
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
exports.editUser = editUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM users WHERE id = ?";
    yield sql_service_1.pool.execute(query, [id]);
    return { id, deleted: true };
});
exports.deleteUser = deleteUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT name, email, phone, type FROM users WHERE id = ?";
    const [rows] = yield sql_service_1.pool.execute(query, [id]);
    return rows[0] || null;
});
exports.getUserById = getUserById;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT name, email, phone, type FROM users";
    const [rows] = yield sql_service_1.pool.execute(query);
    return rows;
});
exports.getAllUsers = getAllUsers;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield sql_service_1.pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
    }
    return null;
});
exports.getUserByEmail = getUserByEmail;
