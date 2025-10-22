"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.getUserById = exports.deleteUser = exports.editUser = exports.updateUser = exports.loginUser = exports.createUser = void 0;
const userService = __importStar(require("./user.service"));
const response_hepler_1 = require("../../common/helper/response.hepler");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_service_1 = require("../../common/services/passport-jwt.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hash(password, 12);
    return hash;
});
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password = yield hashPassword(req.body.password);
    const result = yield userService.createUser(req.body);
    res.send((0, response_hepler_1.createResponse)(result, "User created sucssefully"));
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("login", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || !user) {
            return res.status(401).json({
                message: (info === null || info === void 0 ? void 0 : info.message) || "Authentication failed",
            });
        }
        const { accessToken } = (0, passport_jwt_service_1.createUserTokens)(user);
        res.send((0, response_hepler_1.createResponse)({ accessToken, user }, "Login successful"));
    }))(req, res);
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password) {
        req.body.password = yield hashPassword(req.body.password);
    }
    const result = yield userService.updateUser(Number(req.params.id), req.body);
    res.send((0, response_hepler_1.createResponse)(result, "User updated sucssefully"));
}));
exports.editUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password) {
        req.body.password = yield hashPassword(req.body.password);
    }
    const result = yield userService.editUser(Number(req.params.id), req.body);
    res.send((0, response_hepler_1.createResponse)(result, "User updated sucssefully"));
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.deleteUser(Number(req.params.id));
    res.send((0, response_hepler_1.createResponse)(result, "User deleted sucssefully"));
}));
exports.getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.getUserById(Number(req.params.id));
    res.send((0, response_hepler_1.createResponse)(result));
}));
exports.getAllUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.getAllUsers();
    res.send((0, response_hepler_1.createResponse)(result));
}));
