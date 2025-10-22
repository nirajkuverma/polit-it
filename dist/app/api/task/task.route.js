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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cath_error_middleware_1 = require("../../common/middleware/cath-error.middleware");
const TaskController = __importStar(require("./task.controller"));
const TaskValidator = __importStar(require("./task.validation"));
const role_auth_middleware_1 = require("../../common/middleware/role-auth.middleware");
const router = (0, express_1.Router)();
router
    .get("/", (0, role_auth_middleware_1.roleAuth)(["ADMIN"]), TaskController.getAllTask)
    .get("/:id", (0, role_auth_middleware_1.roleAuth)(["ADMIN"]), TaskController.getTaskById)
    .delete("/:id", (0, role_auth_middleware_1.roleAuth)(["ADMIN"]), TaskController.deleteTask)
    .post("/", (0, role_auth_middleware_1.roleAuth)(["ADMIN"]), TaskValidator.createRecord, cath_error_middleware_1.catchError, TaskController.createTask)
    .put("/:id", (0, role_auth_middleware_1.roleAuth)(["ADMIN"]), TaskValidator.updateRecord, cath_error_middleware_1.catchError, TaskController.updateTask)
    .patch("/:id", (0, role_auth_middleware_1.roleAuth)(["ADMIN"]), TaskValidator.editRecord, cath_error_middleware_1.catchError, TaskController.editTask);
exports.default = router;
