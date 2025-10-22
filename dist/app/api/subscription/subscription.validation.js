"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRecord = exports.updateRecord = exports.createRecord = void 0;
const express_validator_1 = require("express-validator");
exports.createRecord = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("title is required")
        .isString()
        .withMessage("title must be a string"),
    (0, express_validator_1.body)("description")
        .notEmpty()
        .withMessage("description is required")
        .isString()
        .withMessage("description must be a string"),
    (0, express_validator_1.body)("amount")
        .notEmpty()
        .withMessage("amount is required")
        .isString()
        .withMessage("amount must be a string")
        .matches(/^\d+(\.\d{1,2})?$/)
        .withMessage("amount must be a valid number"),
    (0, express_validator_1.body)("api_call")
        .notEmpty()
        .withMessage("api_call is required")
        .isString()
        .withMessage("api_call must be a string"),
];
exports.updateRecord = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("title is required")
        .isString()
        .withMessage("title must be a string"),
    (0, express_validator_1.body)("description")
        .notEmpty()
        .withMessage("description is required")
        .isString()
        .withMessage("description must be a string"),
    (0, express_validator_1.body)("amount")
        .notEmpty()
        .withMessage("amount is required")
        .isString()
        .withMessage("amount must be a string")
        .matches(/^\d+(\.\d{1,2})?$/)
        .withMessage("amount must be a valid number"),
    (0, express_validator_1.body)("api_call")
        .notEmpty()
        .withMessage("api_call is required")
        .isString()
        .withMessage("api_call must be a string"),
];
exports.editRecord = [
    (0, express_validator_1.body)("title").optional().isString().withMessage("title must be a string"),
    (0, express_validator_1.body)("description")
        .optional()
        .isString()
        .withMessage("description must be a string"),
    (0, express_validator_1.body)("amount")
        .optional()
        .isString()
        .withMessage("amount must be a string")
        .matches(/^\d+(\.\d{1,2})?$/)
        .withMessage("amount must be a valid number"),
    (0, express_validator_1.body)("api_call")
        .optional()
        .isString()
        .withMessage("api_call must be a string"),
];
