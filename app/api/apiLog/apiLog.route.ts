import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as ApiLogController from "./apiLog.controller";
import * as ApiLogValidator from "./apiLog.validation";
import { roleAuth } from "../../common/middleware/role-auth.middleware";

const router = Router();

router
  .get("/", roleAuth(["ADMIN", "USER"]), ApiLogController.getAllApiLog)
  .get("/:id", roleAuth(["ADMIN", "USER"]), ApiLogController.getApiLogById)
  .delete("/:id", roleAuth(["ADMIN"]), ApiLogController.deleteApiLog)
  .post(
    "/",
    roleAuth(["ADMIN", "USER"]),
    ApiLogValidator.createRecord,
    catchError,
    ApiLogController.createApiLog
  )
  .put(
    "/:id",
    roleAuth(["ADMIN"]),
    ApiLogValidator.updateRecord,
    catchError,
    ApiLogController.updateApiLog
  )
  .patch(
    "/:id",
    roleAuth(["ADMIN"]),
    ApiLogValidator.editRecord,
    catchError,
    ApiLogController.editApiLog
  );

export default router;
