"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRecord = exports.updateRecord = exports.createRecord = void 0;
const express_validator_1 = require("express-validator");
exports.createRecord = [
    (0, express_validator_1.body)("role")
        .notEmpty()
        .withMessage("role is required")
        .isString()
        .withMessage("role must be a string"),
    (0, express_validator_1.body)("content")
        .notEmpty()
        .withMessage("content is required")
        .isString()
        .withMessage("content must be a string"),
];
exports.updateRecord = [
    (0, express_validator_1.body)("role")
        .notEmpty()
        .withMessage("role is required")
        .isString()
        .withMessage("role must be a string"),
    (0, express_validator_1.body)("content")
        .notEmpty()
        .withMessage("content is required")
        .isString()
        .withMessage("content must be a string"),
];
exports.editRecord = [
    (0, express_validator_1.body)("role").optional().isString().withMessage("role must be a string"),
    (0, express_validator_1.body)("content").optional().isString().withMessage("content must be a string"),
];
