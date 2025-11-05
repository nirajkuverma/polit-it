import * as ApiLogService from "./apiLog.service";
import * as subService from "../subscriber/subscriber.service";
import * as subscriptionService from "../subscription/subscription.service";
import * as taskService from "../task/task.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { type IUser } from "../user/user.dto";

export const createApiLog = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const key = req.body.key as string;
    const sub = await subService.getUpdateSubscription(user.id as number);
    if (!sub) {
      res.send(createResponse("You do not have a valid subscription", "error"));
    } else {
      const subscription = await subscriptionService.getSubscriptionById(
        sub.subId
      );
      const todayLog = await ApiLogService.getApiTodaysLogsByUserNKey(
        user.id as number,
        key
      );
      const api_call = JSON.parse(subscription.api_call);

      const found = api_call.find(
        (item: { key: string; value: number }) => item.key === key
      );

      if (todayLog.length < found.value) {
        //fetch prompt and do the action
        const task = await taskService.getTasksByRole(key);

        const r = await ApiLogService.createApiLog({
          userId: Number(user.id),
          key: key,
        });
        res.send(createResponse(r, "Response send"));
      } else {
        res.send(createResponse("", "Logs are full for the day"));
      }
    }
  }
);

export const getDashboardApi = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const sub = await subService.getUpdateSubscription(user.id as number);
    if (!sub) {
      res.send(createResponse("You do not have a valid subscription", "error"));
    } else {
      const subscription = await subscriptionService.getSubscriptionById(
        sub.subId
      );
      const api_call = JSON.parse(subscription.api_call);
      const data = api_call.map(
        async (item: { key: string; value: number }) => {
          return {
            ...item,
            used:
              (
                await ApiLogService.getApiTodaysLogsByUserNKey(
                  user.id as number,
                  item.key
                )
              ).length || [].length,
          };
        }
      );
      res.send(createResponse(data, "Dashboard Detail"));
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
