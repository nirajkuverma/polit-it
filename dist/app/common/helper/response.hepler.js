"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = void 0;
const createResponse = (data, message, total) => {
    return { data, total, message, success: true };
};
exports.createResponse = createResponse;
