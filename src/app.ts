import express from "express";
import logger from "morgan";
import cors from "cors";
import { customRequest } from "./types/customDefinition";
import { deserializeUser } from "./middleware";
import appRouter from "./routes/";
import errorHandler from "./middleware/error";
import { initializeDatabase } from "./db/connection";

const app = express();

initializeDatabase();

app.use(logger("dev"));
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(deserializeUser);
app.use(errorHandler);

app.use("/api/", appRouter);

app.get("/api/", (req: customRequest, res) => {
  res.status(200).json({ logger: "API is running" });
});

app.listen(app.get("port"), () => {
  console.log(`Server is ready on port : ${app.get("port")}`);
});

export default app;
