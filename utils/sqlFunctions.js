import db from "../connect.js";
import { sqlQueries } from "./sqlQueries.js";

function execute(sql, params = []) {
  const res = db.prepare(sql).run(params);
  return res;
}

function fetchAll(sql, params = []) {
  const res = db.prepare(sql);
  return res.rows;
}

function fetchFirst(sql, params = []) {
  const res = db.prepare(sql, params);
  return res.rows[0];
}

export function insertTransaction(
  transactionID,
  email,
  fullName,
  numberOfKeys,
  costOfTransaction,
) {
  try {
    const response = execute(sqlQueries.inserts.transaction, [
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
