export const transactionTable = `
    CREATE TABLE IF NOT EXISTS transactionstable (
    transactionID VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    numberOfKeys INTEGER NOT NULL,
    costOfTransaction INTEGER NOT NULL,
    isSuccessful BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    paidAt TIMESTAMP NULL
    );
`;

export const keysTable = `
      CREATE TABLE IF NOT EXISTS keystable (
      accesskey VARCHAR(255) PRIMARY KEY,
      email TEXT NOT NULL,
      numberOfUse INTEGER DEFAULT 0 CHECK (numberOfUse < 4) NOT NULL,
      isExpired INTEGER DEFAULT 0 NOT NULL
    );
`;



export const sqlCode = {
  inserts: {
    transaction: `INSERT INTO transactionstable(transactionID, email, fullname, numberofkeys, costoftransaction) VALUES(?,?,?,?,?)`,
    key: `INSERT INTO keystable(accesskey, email) VALUES(?, ?)`
  },
  query: {
    transaction: `SELECT fullname, costoftransaction, numberofkeys FROM transactionstable WHERE transactionID = ?`,
    key: `SELECT accesskey, numberofuse, isexpired FROM keystable WHERE accesskey = ?`
  },
  update: {
    transaction: `UPDATE transactionstable SET issuccessful = true, paidat = CURRENT_TIMESTAMP WHERE transactionID = ?`,
    key: {
      update: `UPDATE keystable SET numberOfUse = numberOfUse + 1 WHERE accesskey = ?`,
      expire: `UPDATE keystable SET isExpired = true WHERE accesskey = ?`
    }
  },
};
