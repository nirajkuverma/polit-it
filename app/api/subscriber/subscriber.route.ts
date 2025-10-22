import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as SubscriberController from "./subscriber.controller";
import * as SubscriberValidator from "./subscriber.validation";
import { roleAuth } from "../../common/middleware/role-auth.middleware";

const router = Router();

router
  .get("/", roleAuth(["ADMIN"]), SubscriberController.getAllSubscriber)
  .get("/:id", roleAuth(["ADMIN"]), SubscriberController.getSubscriberById)
  .delete("/:id", roleAuth(["ADMIN"]), SubscriberController.deleteSubscriber)
  .post(
    "/",
    roleAuth(["USER"]),
    SubscriberValidator.createRecord,
    catchError,
    SubscriberController.createSubscriber
  )
  .put(
    "/:id",
    roleAuth(["ADMIN"]),
    SubscriberValidator.updateRecord,
    catchError,
    SubscriberController.updateSubscriber
  )
  .patch(
    "/:id",
    roleAuth(["ADMIN"]),
    SubscriberValidator.editRecord,
    catchError,
    SubscriberController.editSubscriber
  );

export default router;
