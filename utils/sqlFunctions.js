import db from "../connect.js";
import { sqlCode } from "./sqlQueries.js";

async function execute(sql, params = []) {
  const res = await db.query(sql, params);
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
    const response = await execute(sqlCode.inserts.transaction, [
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


export async function queryTransaction(transactionID) {
  try {
    const response = await execute(sqlCode.query.transaction, [transactionID])
    
    return response;  
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
    const response = await execute(sqlCode.query.key, [key]);
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}
export async function updateKeyNumberOfUse(key) {
  try {
    const response = await execute(sqlCode.update.key.update, [key]);
    return response
  } catch (error) {
    console.log(error)
  }
}
export async function expireKey(key) {
  try {
    const response = await execute(sqlCode.update.key.expire, [key]);
    return response
  } catch (error) {
    console.log(error)
  }
}

