/* import { Pool } from "pg";
import { transactionTable } from "./utils/sqlQueries.js";
import { DB_CONNECTION_STRING } from "./utils/constants.js";

const models = [transactionTable];
const client = new Pool({
  connectionString: DB_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
});

await client.on("error", (err) =>
  console.error("Something went wrong", err.stack),
);
await client.connect().then(() => console.log("DB connection successful"));

for (let model of models) await client.query(model);

export default client; */

import Database from "better-sqlite3";
import {DB_NAME} from "./utils/constants.js"
import { dbTables } from "./utils/sqlQueries.js";

const db = new Database(DB_NAME);
db.pragma("journal_mode = WAL");

db.exec(dbTables)


export default db;
