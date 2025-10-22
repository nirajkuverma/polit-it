import { body } from "express-validator";

export const createRecord = [
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .isString()
    .withMessage("role must be a string"),

  body("content")
    .notEmpty()
    .withMessage("content is required")
    .isString()
    .withMessage("content must be a string"),
];

export const updateRecord = [
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .isString()
    .withMessage("role must be a string"),

  body("content")
    .notEmpty()
    .withMessage("content is required")
    .isString()
    .withMessage("content must be a string"),
];

export const editRecord = [
  body("role").optional().isString().withMessage("role must be a string"),

  body("content").optional().isString().withMessage("content must be a string"),
];
