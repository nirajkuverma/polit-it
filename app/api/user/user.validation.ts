import { body } from "express-validator";

export const createUser = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be valid"),

  body("phone")
    .notEmpty()
    .withMessage("phone is required")
    .isString()
    .withMessage("phone must be a string")
    .isLength({ min: 10, max: 15 })
    .withMessage("phone must be between 10–15 digits"),

  body("type")
    .notEmpty()
    .withMessage("type is required")
    .isString()
    .withMessage("type must be a string"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
];

export const loginUser = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be valid"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
];

export const updateUser = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be valid"),

  body("phone")
    .notEmpty()
    .withMessage("phone is required")
    .isString()
    .withMessage("phone must be a string")
    .isLength({ min: 10, max: 15 })
    .withMessage("phone must be between 10–15 digits"),

  body("type")
    .notEmpty()
    .withMessage("type is required")
    .isString()
    .withMessage("type must be a string"),

  body("password")
    .optional()
    .isString()
    .withMessage("password must be a string"),
];

export const editUser = [
  body("name").optional().isString().withMessage("name must be a string"),

  body("email").optional().isEmail().withMessage("email must be valid"),

  body("phone")
    .optional()
    .isString()
    .withMessage("phone must be a string")
    .isLength({ min: 10, max: 15 })
    .withMessage("phone must be between 10–15 digits"),

  body("type").optional().isString().withMessage("type must be a string"),

  body("password")
    .optional()
    .isString()
    .withMessage("password must be a string"),
];
