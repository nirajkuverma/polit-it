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
        (item: { key: string; value: number }) =>
          item.key.toLowerCase() === key.toLowerCase()
      );
      console.log("foundx", found, api_call);

      if (todayLog.length < found.value) {
        //fetch prompt and do the action
        const task = await taskService.getTasksByRole(key);

        // code here — calling an external API
        const politeMessage = await makePoliteMessage(
          task.content + req.body.message
        );

        const r = await ApiLogService.createApiLog({
          userId: Number(user.id),
          key: key,
        });
        res.send(createResponse(politeMessage, "Response send"));
      } else {
        res.send(createResponse("", "Logs are full for the day"));
      }
    }
  }
);

async function makePoliteMessage(message: string): Promise<string> {
  const apiUrl = "https://api.together.xyz/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 053f0384a9d53b507090de30fe11c6f4cd9d85b127f1c71b34a6db72ca3093b4",
  };

  const body = {
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: `${message}`,
      },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const politeReply = data.choices?.[0]?.message?.content;
    return politeReply || "Sorry, couldn't rewrite the message.";
  } catch (error) {
    console.error("API error:", error);
    return "Error: Failed to reach polite API.";
  }
}

export const getDashboardApi = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const sub = await subService.getUpdateSubscription(user.id as number);

    if (!sub) {
      res.send(createResponse("You do not have a valid subscription", "error"));
      return;
    }

    const subscription = await subscriptionService.getSubscriptionById(
      sub.subId
    );

    const api_call = JSON.parse(subscription.api_call);

    const data = await Promise.all(
      api_call.map(async (item: { key: string; value: number }) => {
        const logs = await ApiLogService.getApiTodaysLogsByUserNKey(
          user.id as number,
          item.key
        );

        return {
          ...item,
          used: logs.length,
        };
      })
    );

    res.send(createResponse(data, "Dashboard Detail"));
    return;
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
