import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authRouter = Router();

// login route
authRouter.post(`/login`, AuthController.login);

export default authRouter;
