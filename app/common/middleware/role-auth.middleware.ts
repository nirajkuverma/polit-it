import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import process from "process";
import { IUser } from "../../api/user/user.dto";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const roleAuth = (roles: IUser["type"][], publicRoutes: string[] = []) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (publicRoutes.includes(req.path)) {
        next();
        return;
      }
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw createHttpError(401, {
          message: `Invalid token`,
        });
      }

      const decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decodedUser as IUser;
      const user = req.user as IUser;
      if (user.type == null || !["ADMIN", "USER"].includes(user.type)) {
        throw createHttpError(401, { message: "Invalid user type" });
      }
      if (!roles.includes(user.type)) {
        const type =
          user.type.slice(0, 1) + user.type.slice(1).toLocaleLowerCase();

        throw createHttpError(401, {
          message: `${type} can not access this resource`,
        });
      }
      next();
    }
  );
