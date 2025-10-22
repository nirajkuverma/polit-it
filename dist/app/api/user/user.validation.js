"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.updateUser = exports.loginUser = exports.createUser = void 0;
const express_validator_1 = require("express-validator");
exports.createUser = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("name is required")
        .isString()
        .withMessage("name must be a string"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be valid"),
    (0, express_validator_1.body)("phone")
        .notEmpty()
        .withMessage("phone is required")
        .isString()
        .withMessage("phone must be a string")
        .isLength({ min: 10, max: 15 })
        .withMessage("phone must be between 10–15 digits"),
    (0, express_validator_1.body)("type")
        .notEmpty()
        .withMessage("type is required")
        .isString()
        .withMessage("type must be a string"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required")
        .isString()
        .withMessage("password must be a string"),
];
exports.loginUser = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be valid"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required")
        .isString()
        .withMessage("password must be a string"),
];
exports.updateUser = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("name is required")
        .isString()
        .withMessage("name must be a string"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email must be valid"),
    (0, express_validator_1.body)("phone")
        .notEmpty()
        .withMessage("phone is required")
        .isString()
        .withMessage("phone must be a string")
        .isLength({ min: 10, max: 15 })
        .withMessage("phone must be between 10–15 digits"),
    (0, express_validator_1.body)("type")
        .notEmpty()
        .withMessage("type is required")
        .isString()
        .withMessage("type must be a string"),
    (0, express_validator_1.body)("password")
        .optional()
        .isString()
        .withMessage("password must be a string"),
];
exports.editUser = [
    (0, express_validator_1.body)("name").optional().isString().withMessage("name must be a string"),
    (0, express_validator_1.body)("email").optional().isEmail().withMessage("email must be valid"),
    (0, express_validator_1.body)("phone")
        .optional()
        .isString()
        .withMessage("phone must be a string")
        .isLength({ min: 10, max: 15 })
        .withMessage("phone must be between 10–15 digits"),
    (0, express_validator_1.body)("type").optional().isString().withMessage("type must be a string"),
    (0, express_validator_1.body)("password")
        .optional()
        .isString()
        .withMessage("password must be a string"),
];
