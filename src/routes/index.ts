import { Router } from "express";
import branchRouter from "./branch.route";

const routes = Router();

// branch router
routes.use("/branch", branchRouter);

export default routes;
