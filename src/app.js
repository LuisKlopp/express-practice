import express from "express";
import { router as usersRouter } from "./routes/users.js";
import { router as channelsRouter } from "./routes/channels.js";

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/channels", channelsRouter);

app.listen(8888);
