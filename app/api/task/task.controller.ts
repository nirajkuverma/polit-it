import * as TaskService from "./task.service";
import { createResponse } from "../../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskService.createTask(req.body);
  res.send(createResponse(result, "Task created sucssefully"));
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskService.updateTask(Number(req.params.id), req.body);
  res.send(createResponse(result, "Task updated sucssefully"));
});

export const editTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskService.editTask(Number(req.params.id), req.body);
  res.send(createResponse(result, "Task updated sucssefully"));
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskService.deleteTask(Number(req.params.id));
  res.send(createResponse(result, "Task deleted sucssefully"));
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskService.getTaskById(Number(req.params.id));
  res.send(createResponse(result));
});

export const getAllTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskService.getAllTasks();
  res.send(createResponse(result));
});
