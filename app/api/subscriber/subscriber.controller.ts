import * as SubscriberService from "./subscriber.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createSubscriber = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriberService.createSubscriber({
      ...req.body,
      userId: req?.user?.id,
    });
    res.send(createResponse(result, "Subscriber created sucssefully"));
  }
);

export const updateSubscriber = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriberService.updateSubscriber(
      Number(req.params.id),
      {
        ...req.body,
        userId: req?.user?.id,
      }
    );
    res.send(createResponse(result, "Subscriber updated sucssefully"));
  }
);

export const editSubscriber = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriberService.editSubscriber(
      Number(req.params.id),
      req.body
    );
    res.send(createResponse(result, "Subscriber updated sucssefully"));
  }
);

export const deleteSubscriber = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriberService.deleteSubscriber(
      Number(req.params.id)
    );
    res.send(createResponse(result, "Subscriber deleted sucssefully"));
  }
);

export const getSubscriberById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriberService.getSubscriberById(
      Number(req.params.id)
    );
    res.send(createResponse(result));
  }
);

export const getAllSubscriber = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await SubscriberService.getAllSubscribers();
    res.send(createResponse(result));
  }
);
