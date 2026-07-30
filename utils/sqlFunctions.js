import client from "../connect.js";
import { sqlQueries } from "./sqlQueries.js";

async function execute(sql, params = []) {
  const res = await client.query(sql, params);
  return res.rows[0];
}

async function fetchAll(sql, params = []) {
  const res = await client.query(sql, params);
  return res.rows;
}

async function fetchFirst(sql, params = []) {
  const res = await client.query(sql, params);
  return res.rows[0];
}

export async function insertTransaction(
  transactionID,
  email,
  fullName,
  numberOfKeys,
  costOfTransaction,
) {
  try {
    const response = await execute(sqlQueries.inserts.transaction, [
      transactionID,
      email,
      fullName,
      numberOfKeys,
      costOfTransaction,
    ]);
    return response;
  } catch (error) {
    console.log(error);
  }
}
