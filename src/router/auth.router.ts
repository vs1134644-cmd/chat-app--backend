import { Router } from "express";
import { signup } from "../controller/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/signup", signup);

export default AuthRouter;