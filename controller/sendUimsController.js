import { expireKey, getKey, updateKeyNumberOfUse } from "../utils/sqlFunctions.js";
import { readFile } from "node:fs/promises"

export async function sendUimsController(req, res) {
  try {
    const { apikey } = req.query;

      const { key, numberofuse, isexpired } = await getKey(apikey);
      
      if (!key || isexpired || numberofuse > 2) return res.send(403) // this is overkill

      if (numberofuse == 2) await expireKey(key)
      
      await updateKeyNumberOfUse(key)

      
    const fileContent = await readFile(`uims.csl`);
    res.setHeader("Content-Type", "text/plain");
    res.send(fileContent);
  } catch (err) {
    console.error("Error sending file:", err);
    res.status(500).send("Internal Server Error");
  }
}
