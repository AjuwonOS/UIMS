import express, { json, static as static_ } from "express";
import "./connect.js"
import "./gmailSetup.js"
import router from "./route/router.js";
import {readFile} from "fs/promises"

const app = express();
app.use(json());
app.use(static_("./client"))
app.use(router)
app.get("/download-csl",async (req, res) => {
  try {
    
    
    const fileContent = await readFile(`uims.csl`);
    
  
    res.setHeader("Content-Type", "text/plain"); 

    // Send the file content
    res.send(fileContent);
  } catch (err) {
    console.error("Error sending file:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
