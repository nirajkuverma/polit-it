import { Router } from "express";
import { catchError } from "../../common/middleware/cath-error.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import { roleAuth } from "../../common/middleware/role-auth.middleware";

const router = Router();

router
  .get("/", roleAuth(["ADMIN", "USER"]), userController.getAllUser)
  .get("/:id", roleAuth(["ADMIN", "USER"]), userController.getUserById)
  .delete("/:id", roleAuth(["ADMIN", "USER"]), userController.deleteUser)
  .post("/", userValidator.createUser, catchError, userController.createUser)
  .post("/login", userValidator.loginUser, catchError, userController.loginUser)
  .put(
    "/:id",
    roleAuth(["ADMIN", "USER"]),
    userValidator.updateUser,
    catchError,
    userController.updateUser
  )
  .patch(
    "/:id",
    roleAuth(["ADMIN", "USER"]),
    userValidator.editUser,
    catchError,
    userController.editUser
  );

export default router;
