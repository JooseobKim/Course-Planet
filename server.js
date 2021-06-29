import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRouter from "./routes/courseRouter";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import reviewRouter from "./routes/reviewRouter";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/courses", courseRouter);
app.use("/review", reviewRouter);

export default app;
