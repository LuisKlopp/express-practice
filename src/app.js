import express from "express";
import { router as todoRouter } from "./routes/todos.js";

const app = express();

app.use(express.json());

app.use("/todos", todoRouter);

app.listen(8888);
