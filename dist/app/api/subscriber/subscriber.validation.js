"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRecord = exports.updateRecord = exports.createRecord = void 0;
const express_validator_1 = require("express-validator");
exports.createRecord = [
    (0, express_validator_1.body)("subId")
        .notEmpty()
        .withMessage("subId is required")
        .isString()
        .withMessage("subId must be a string"),
];
exports.updateRecord = [
    (0, express_validator_1.body)("subId")
        .notEmpty()
        .withMessage("subId is required")
        .isString()
        .withMessage("subId must be a string"),
];
exports.editRecord = [
    (0, express_validator_1.body)("subId").optional().isString().withMessage("subId must be a string"),
];
