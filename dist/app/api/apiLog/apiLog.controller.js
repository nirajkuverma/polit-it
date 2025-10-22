"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllApiLog = exports.getApiLogById = exports.deleteApiLog = exports.editApiLog = exports.updateApiLog = exports.createApiLog = void 0;
const ApiLogService = __importStar(require("./apiLog.service"));
const subService = __importStar(require("../subscriber/subscriber.service"));
const subscriptionService = __importStar(require("../subscription/subscription.service"));
const response_hepler_1 = require("../../common/helper/response.hepler");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.createApiLog = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const sub = yield subService.getUpdateSubscription((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!sub) {
        res.send((0, response_hepler_1.createResponse)("You do not have a valid subscription", "error"));
    }
    else {
        const subscription = yield subscriptionService.getSubscriptionById(sub.id);
        const todayLog = yield ApiLogService.getApiTodaysLogsByUser((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        if (subscription.api_call < todayLog.length) {
            //fetch prompt and do the action
            const r = yield ApiLogService.createApiLog({
                userId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.id),
                key: "1",
            });
            res.send((0, response_hepler_1.createResponse)(r, "Response send"));
        }
        else {
            res.send((0, response_hepler_1.createResponse)("", "Logs are full for the day"));
        }
    }
}));
exports.updateApiLog = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ApiLogService.updateApiLog(Number(req.params.id), req.body);
    res.send((0, response_hepler_1.createResponse)(result, "ApiLog updated sucssefully"));
}));
exports.editApiLog = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ApiLogService.editApiLog(Number(req.params.id), req.body);
    res.send((0, response_hepler_1.createResponse)(result, "ApiLog updated sucssefully"));
}));
exports.deleteApiLog = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ApiLogService.deleteApiLog(Number(req.params.id));
    res.send((0, response_hepler_1.createResponse)(result, "ApiLog deleted sucssefully"));
}));
exports.getApiLogById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ApiLogService.getApiLogById(Number(req.params.id));
    res.send((0, response_hepler_1.createResponse)(result));
}));
exports.getAllApiLog = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ApiLogService.getAllApiLogs();
    res.send((0, response_hepler_1.createResponse)(result));
}));
