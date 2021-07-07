import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "express-async-errors";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { csrfCheck } from "./library/csrf.js";
import rateLimiter from "./library/rate-limiter.js";

const app = express();

const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
    credentials: true, // allow the Access-Control-Allow-Credentials
};

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));
app.use(rateLimiter);

app.use(csrfCheck);
app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hi");
});

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

console.log(`Server is started... ${new Date()}`);
const server = app.listen(config.port);
initSocket(server);
