import { Pool } from "pg";
import { keysTable, transactionTable } from "./utils/sqlQueries.js";
import { DB_CONNECTION_STRING } from "./utils/constants.js";

const models = [transactionTable, keysTable];
const client = new Pool({
  connectionString: DB_CONNECTION_STRING,
  ssl: false,
});

await client.on("error", (err) =>
  console.error("Something went wrong", err.stack),
);
await client.connect().then(() => console.log("DB connection successful"));

for (let model of models) await client.query(model);

export default client;

