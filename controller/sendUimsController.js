import {
  expireKey,
  getKey,
  updateKeyNumberOfUse,
} from "../utils/sqlFunctions.js";
import { readFile } from "node:fs/promises";

export async function sendUimsController(req, res) {
  try {
    const { apikey } = req.query;

    const data = await getKey(apikey);
    
    if (!data) return res.send(403); 

    const { accesskey, numberofuse, isexpired } =  data
    // this is overkill

    if (numberofuse == 2) await expireKey(accesskey);

    await updateKeyNumberOfUse(accesskey);

    const fileContent = await readFile(`uims.csl`);
    res.setHeader("Content-Type", "text/plain");
    res.send(fileContent);
  } catch (err) {
    console.error("Error sending file:", err);
    res.status(500).send("Internal Server Error");
  }
}
