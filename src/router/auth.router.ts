import { Router } from "express";
import { getSession, login, signup } from "../controller/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login",login)
AuthRouter.get("/session", getSession);

export default AuthRouter;