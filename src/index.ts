import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import AuthRouter from "./router/auth.router";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", AuthRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB as string);

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server Running On Port ${process.env.PORT || 8000}`);
    });
  } catch (err) {
    console.log("MongoDB Error:", err);
  }
};

startServer();
