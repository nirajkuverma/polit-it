import { body } from "express-validator";

export const createRecord = [
  body("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isString()
    .withMessage("userId must be a string"),

  body("key")
    .notEmpty()
    .withMessage("key is required")
    .isString()
    .withMessage("key must be a string"),

  body("date")
    .notEmpty()
    .withMessage("date is required")
    .isISO8601()
    .withMessage("date must be a valid ISO date (YYYY-MM-DD)"),

  body("time")
    .notEmpty()
    .withMessage("time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("time must be in HH:mm format"),
];

export const updateRecord = [
  body("userId")
    .notEmpty()
    .withMessage("userId is required")
    .isString()
    .withMessage("userId must be a string"),

  body("key")
    .notEmpty()
    .withMessage("key is required")
    .isString()
    .withMessage("key must be a string"),

  body("date")
    .notEmpty()
    .withMessage("date is required")
    .isISO8601()
    .withMessage("date must be a valid ISO date (YYYY-MM-DD)"),

  body("time")
    .notEmpty()
    .withMessage("time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("time must be in HH:mm format"),
];

export const editRecord = [
  body("userId").optional().isString().withMessage("userId must be a string"),

  body("key").optional().isString().withMessage("key must be a string"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("date must be a valid ISO date (YYYY-MM-DD)"),

  body("time")
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("time must be in HH:mm format"),
];
