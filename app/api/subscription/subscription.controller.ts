import * as SubscriptionService from "./subscription.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriptionService.createSubscription(req.body);
    res.send(createResponse(result, "Subscription created sucssefully"));
  }
);

export const updateSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriptionService.updateSubscription(
      Number(req.params.id),
      req.body
    );
    res.send(createResponse(result, "Subscription updated sucssefully"));
  }
);

export const editSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriptionService.editSubscription(
      Number(req.params.id),
      req.body
    );
    res.send(createResponse(result, "Subscription updated sucssefully"));
  }
);

export const deleteSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriptionService.deleteSubscription(
      Number(req.params.id)
    );
    res.send(createResponse(result, "Subscription deleted sucssefully"));
  }
);

export const getSubscriptionById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriptionService.getSubscriptionById(
      Number(req.params.id)
    );
    res.send(createResponse(result));
  }
);

export const getAllSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriptionService.getAllSubscriptions();
    res.send(createResponse(result));
  }
);
