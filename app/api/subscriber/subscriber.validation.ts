import { body } from "express-validator";

export const createRecord = [
  body("subId")
    .notEmpty()
    .withMessage("subId is required")
    .isString()
    .withMessage("subId must be a string"),
];

export const updateRecord = [
  body("subId")
    .notEmpty()
    .withMessage("subId is required")
    .isString()
    .withMessage("subId must be a string"),
];

export const editRecord = [
  body("subId").optional().isString().withMessage("subId must be a string"),
];
