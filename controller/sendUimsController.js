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
    
    if (!data) return res
      .status(403)
      .send({ message: "Access key does not exist", success: false }); 

    const { accesskey, numberofuse, isexpired } =  data
    // this is overkill

    if (isexpired || numberofuse >= 3) {
      return res
        .status(403)
        .send({ message: "Access key has expired", success: false });
    }

    if (numberofuse == 2) {
      await expireKey(accesskey);
    }

    await updateKeyNumberOfUse(accesskey);
    return res
      .status(200)
      .sendFile(`${process.cwd()}/uims.csl`);
  } catch (err) {
    console.error("Error sending file:", err);
    res.status(500).send("Internal Server Error");
  }
}
