import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as TaskController from "./task.controller";
import * as TaskValidator from "./task.validation";
import { roleAuth } from "../../common/middleware/role-auth.middleware";

const router = Router();

router
  .get("/", roleAuth(["ADMIN"]), TaskController.getAllTask)
  .get("/:id", roleAuth(["ADMIN"]), TaskController.getTaskById)
  .delete("/:id", roleAuth(["ADMIN"]), TaskController.deleteTask)
  .post(
    "/",
    roleAuth(["ADMIN"]),
    TaskValidator.createRecord,
    catchError,
    TaskController.createTask
  )
  .put(
    "/:id",
    roleAuth(["ADMIN"]),
    TaskValidator.updateRecord,
    catchError,
    TaskController.updateTask
  )
  .patch(
    "/:id",
    roleAuth(["ADMIN"]),
    TaskValidator.editRecord,
    catchError,
    TaskController.editTask
  );

export default router;
