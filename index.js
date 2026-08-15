import express, { json, static as static_ } from "express";
import router from "./route/router.js";
import { PORT } from "./utils/constants.js";

const app = express();
app.use(json());
app.use(static_("./client"));
app.use(router);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});