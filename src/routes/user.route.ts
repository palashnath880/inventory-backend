import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();

// post route
userRouter.post(`/`, UserController.create);

// get all users
userRouter.get(`/`, UserController.getUsers);

// update rroute
userRouter.put(`/:userId`, UserController.update);

// delete route
userRouter.delete("/:userId", UserController.deleteUser);

export default userRouter;
