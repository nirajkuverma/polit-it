import * as ApiLogService from "./apiLog.service";
import * as subService from "../subscriber/subscriber.service";
import * as subscriptionService from "../subscription/subscription.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createApiLog = asyncHandler(
  async (req: Request, res: Response) => {
    const sub = await subService.getUpdateSubscription(req.user?.id as number);
    if (!sub) {
      res.send(createResponse("You do not have a valid subscription", "error"));
    } else {
      const subscription = await subscriptionService.getSubscriptionById(
        sub.id
      );
      const todayLog = await ApiLogService.getApiTodaysLogsByUser(
        req.user?.id as number
      );

      if (subscription.api_call < todayLog.length) {
        //fetch prompt and do the action
        const r = await ApiLogService.createApiLog({
          userId: Number(req.user?.id),
          key: "1",
        });
        res.send(createResponse(r, "Response send"));
      } else {
        res.send(createResponse("", "Logs are full for the day"));
      }
    }
  }
);

export const updateApiLog = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ApiLogService.updateApiLog(
      Number(req.params.id),
      req.body
    );
    res.send(createResponse(result, "ApiLog updated sucssefully"));
  }
);

export const editApiLog = asyncHandler(async (req: Request, res: Response) => {
  const result = await ApiLogService.editApiLog(
    Number(req.params.id),
    req.body
  );
  res.send(createResponse(result, "ApiLog updated sucssefully"));
});

export const deleteApiLog = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ApiLogService.deleteApiLog(Number(req.params.id));
    res.send(createResponse(result, "ApiLog deleted sucssefully"));
  }
);

export const getApiLogById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ApiLogService.getApiLogById(Number(req.params.id));
    res.send(createResponse(result));
  }
);

export const getAllApiLog = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ApiLogService.getAllApiLogs();
    res.send(createResponse(result));
  }
);
