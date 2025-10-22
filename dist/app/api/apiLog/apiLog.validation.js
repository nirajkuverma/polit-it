"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRecord = exports.updateRecord = exports.createRecord = void 0;
const express_validator_1 = require("express-validator");
exports.createRecord = [
    (0, express_validator_1.body)("userId")
        .notEmpty()
        .withMessage("userId is required")
        .isString()
        .withMessage("userId must be a string"),
    (0, express_validator_1.body)("key")
        .notEmpty()
        .withMessage("key is required")
        .isString()
        .withMessage("key must be a string"),
    (0, express_validator_1.body)("date")
        .notEmpty()
        .withMessage("date is required")
        .isISO8601()
        .withMessage("date must be a valid ISO date (YYYY-MM-DD)"),
    (0, express_validator_1.body)("time")
        .notEmpty()
        .withMessage("time is required")
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage("time must be in HH:mm format"),
];
exports.updateRecord = [
    (0, express_validator_1.body)("userId")
        .notEmpty()
        .withMessage("userId is required")
        .isString()
        .withMessage("userId must be a string"),
    (0, express_validator_1.body)("key")
        .notEmpty()
        .withMessage("key is required")
        .isString()
        .withMessage("key must be a string"),
    (0, express_validator_1.body)("date")
        .notEmpty()
        .withMessage("date is required")
        .isISO8601()
        .withMessage("date must be a valid ISO date (YYYY-MM-DD)"),
    (0, express_validator_1.body)("time")
        .notEmpty()
        .withMessage("time is required")
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage("time must be in HH:mm format"),
];
exports.editRecord = [
    (0, express_validator_1.body)("userId").optional().isString().withMessage("userId must be a string"),
    (0, express_validator_1.body)("key").optional().isString().withMessage("key must be a string"),
    (0, express_validator_1.body)("date")
        .optional()
        .isISO8601()
        .withMessage("date must be a valid ISO date (YYYY-MM-DD)"),
    (0, express_validator_1.body)("time")
        .optional()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage("time must be in HH:mm format"),
];
