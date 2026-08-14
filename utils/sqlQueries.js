export const transactionTable = `
    CREATE TABLE IF NOT EXISTS transactionstable (
        transactionID TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        fullName TEXT NOT NULL,
        numberOfKeys INTEGER NOT NULL,
        costOfTransaction INTEGER NOT NULL,
        isSuccessful BOOLEAN DEFAULT FALSE NOT NULL,
        createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        paidAt TEXT
    );
`;

export const keysTable = `
      CREATE TABLE IF NOT EXISTS keystable (
      key TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      numberOfUse INTEGER DEFAULT 0 CHECK (numberOfUse < 4) NOT NULL,
      isExpired INTEGER DEFAULT 0 NOT NULL
    );
`;



export const sqlCode = {
  inserts: {
    transaction: `INSERT INTO transactionstable(transactionID, email, fullName, numberOfKeys, costOfTransaction) VALUES($1,$2,$3,$4,$5)`,
    key: `INSERT INTO keystable(key, email) VALUES($1, $2)`
  },
  query: {
    transaction: `SELECT fullname, costOftransaction, numberOfkeys FROM transactionstable WHERE transactionID = $1`,
    key: `SELECT key, numberofuse, isexpired FROM keystable WHERE key = $1`
  },
  update: {
    transaction: `UPDATE transactionstable SET issuccessful = true, paidat = CURRENT_TIMESTAMP WHERE transactionID = $1`,
    key: {
      update: `UPDATE keystable SET numberOfUse = numberOfUse + 1 WHERE key = $1`,
      expire: `UPDATE keystable SET isExpired = true WHERE key = $1`
    }
  },
};
