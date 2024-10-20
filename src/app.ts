import express from "express";
import http from "http";
import logger from "morgan";
import cors from "cors";
import { customRequest } from "./types/customDefinition";
import { deserializeUser } from "./middleware";
import appRouter from "./routes/";
import { errorHandler, notFoundHandler } from "./middleware/error";
import { initializeDatabase } from "./db/connection";
import { initializeSocketIO } from "./services/webSocket";

const app = express();
const server = http.createServer(app);

initializeSocketIO(server);
initializeDatabase();

app.use(logger("dev"));
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(deserializeUser);

app.use("/api/", appRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.get("/api/", (req: customRequest, res) => {
  res.status(200).json({ logger: "API is running" });
});

server.listen(app.get("port"), () => {
  console.log(`Server is ready on port : ${app.get("port")}`);
});
