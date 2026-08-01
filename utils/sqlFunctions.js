import db from "../connect.js";
import { sqlCode } from "./sqlQueries.js";

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
    const response = execute(sqlCode.inserts.transaction, [
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


export function queryTransaction(transactionID) {
  try {
    const response = db.prepare(sqlCode.query.transaction).get(transactionID)
    return response;  
  } catch (error) {
    console.log(error)
  }
  
}

export function updateTransactionToSuccessful(transactionID) {
  try {
    const response = db.prepare(sqlCode.update.transaction).run(transactionID);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export function insertKey(key, email) {
  try {
    const response = db.prepare(sqlCode.inserts.key).run([key, email])
    return response
  } catch (error) {
    console.log(error)
  }
}

