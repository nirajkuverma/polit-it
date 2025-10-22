import { body } from "express-validator";

export const createRecord = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),

  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),

  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isString()
    .withMessage("amount must be a string")
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage("amount must be a valid number"),

  body("api_call")
    .notEmpty()
    .withMessage("api_call is required")
    .isString()
    .withMessage("api_call must be a string"),
];

export const updateRecord = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),

  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),

  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isString()
    .withMessage("amount must be a string")
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage("amount must be a valid number"),

  body("api_call")
    .notEmpty()
    .withMessage("api_call is required")
    .isString()
    .withMessage("api_call must be a string"),
];

export const editRecord = [
  body("title").optional().isString().withMessage("title must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),

  body("amount")
    .optional()
    .isString()
    .withMessage("amount must be a string")
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage("amount must be a valid number"),

  body("api_call")
    .optional()
    .isString()
    .withMessage("api_call must be a string"),
];
