"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configure storage engine and filename
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
// Initialize upload middleware and add file size limit
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 },
});
