import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import coursesRouter from "./routes/coursesRouter";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import reviewRouter from "./routes/reviewRouter";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/courses", coursesRouter);
app.use("/review", reviewRouter);

export default app;
