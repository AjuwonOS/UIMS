import db from "../connect.js";
import { sqlCode } from "./sqlQueries.js";

async function execute(sql, params = []) {
  const res = await db.execute(sql, params);
  return res;
}
async function query(sql, params = []) {
  const res = await db.query(sql, params);
  return res;
}

export async function insertTransaction(
  transactionID,
  email,
  fullName,
  numberOfKeys,
  costOfTransaction,
) {
  try {
    const [result] = await execute(sqlCode.inserts.transaction, [
      transactionID,
      email,
      fullName,
      numberOfKeys,
      costOfTransaction,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
}


export async function queryTransaction(transactionID) {
  try {
    const [rows] = await execute(sqlCode.query.transaction, [transactionID])
    return rows[0];  
  } catch (error) {
    console.log(error)
  }
  
}

export async function updateTransactionToSuccessful(transactionID) {
  try {
    const response = await execute(sqlCode.update.transaction, [transactionID]);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function insertKey(key, email) {
  try {
    const response = await execute(sqlCode.inserts.key, [key, email])
    
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getKey(key) {
  try {
    const [rows] = await execute(sqlCode.query.key, [key]);
    return rows[0];
  } catch (error) {
    console.log(error)
  }
}
export async function updateKeyNumberOfUse(key) {
  try {
    const [result] = await execute(sqlCode.update.key.update, [key]);
    return result
  } catch (error) {
    console.log(error)
  }
}
export async function expireKey(key) {
  try {
    const [result] = await execute(sqlCode.update.key.expire, [key]);
    return result
  } catch (error) {
    console.log(error)
  }
}

