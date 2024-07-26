import { Router } from "express";
import branchRouter from "./branch.route";
import userRouter from "./user.route";

const routes = Router();

// branch router
routes.use("/branch", branchRouter);

// user router
routes.use("/user", userRouter);

export default routes;
