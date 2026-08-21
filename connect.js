/* import { Pool } from "pg";
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

 */

import mysql from "mysql2/promise";
import {
  MYSQL_DATABASE,
  MYSQL_HOSTNAME,
  MYSQL_PASSWORD,
  MYSQL_USERNAME,
} from "./utils/constants.js";
import { keysTable, transactionTable } from "./utils/sqlQueries.js";


const tables = [transactionTable, keysTable];
const client = mysql.createPool({
  host: MYSQL_HOSTNAME,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
})


async function createTablex() {
  try {
    for (let table of tables) {
      await client.execute(table);
    }
  } catch (error) {
    console.log(error)
  }
}



export default client;



