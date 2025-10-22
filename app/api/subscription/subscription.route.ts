import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as SubscriptionController from "./subscription.controller";
import * as SubscriptionValidator from "./subscription.validation";
import { roleAuth } from "../../common/middleware/role-auth.middleware";

const router = Router();

router
  .get("/", roleAuth(["ADMIN"]), SubscriptionController.getAllSubscription)
  .get("/:id", roleAuth(["ADMIN"]), SubscriptionController.getSubscriptionById)
  .delete(
    "/:id",
    roleAuth(["ADMIN"]),
    SubscriptionController.deleteSubscription
  )
  .post(
    "/",
    roleAuth(["ADMIN"]),
    SubscriptionValidator.createRecord,
    catchError,
    SubscriptionController.createSubscription
  )
  .put(
    "/:id",
    roleAuth(["ADMIN"]),
    SubscriptionValidator.updateRecord,
    catchError,
    SubscriptionController.updateSubscription
  )
  .patch(
    "/:id",
    roleAuth(["ADMIN"]),
    SubscriptionValidator.editRecord,
    catchError,
    SubscriptionController.editSubscription
  );

export default router;
