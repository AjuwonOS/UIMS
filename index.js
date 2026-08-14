import express, { json, static as static_ } from "express";
import "./connect.js";
import "./gmailSetup.js";
import router from "./route/router.js";
import { readFile } from "fs/promises";
import { PORT } from "./utils/constants.js";

const app = express();
app.use(json());
app.use(static_("./client"));
app.use(router);

app.listen(PORT,"0.0.0.0", () => {
  console.log(`App is listening on port ${PORT}`);
});