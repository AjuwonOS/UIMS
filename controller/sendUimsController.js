import { expireKey, getKey, updateKeyNumberOfUse } from "../utils/sqlFunctions.js";
import {readFile} from "node:fs/promises"
export async function sendUimsController(req, res) {
  try {
    const { apikey } = req.query;

      const { key, numberOfUse, isExpired } = getKey(apikey);
      console.log(key, numberOfUse, isExpired)
      if (!key || isExpired || numberOfUse > 2) return res.send(403) // this is overkill

      if (numberOfUse == 2) expireKey(key)
      
      updateKeyNumberOfUse(key)

      
    const fileContent = await readFile(`uims.csl`);
    res.setHeader("Content-Type", "text/plain");
    res.send(fileContent);
  } catch (err) {
    console.error("Error sending file:", err);
    res.status(500).send("Internal Server Error");
  }
}
