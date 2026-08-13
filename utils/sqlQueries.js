export const dbTables = `
    CREATE TABLE IF NOT EXISTS transactions (
        transactionID TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        fullName TEXT NOT NULL,
        numberOfKeys INTEGER NOT NULL,
        costOfTransaction INTEGER NOT NULL,
        isSuccessful BOOLEAN DEFAULT FALSE NOT NULL,
        createAt TEXT DEFAULT (datetime('now', 'localtime')),
        paidAt TEXT
    );

    CREATE TABLE IF NOT EXISTS keys (
      key PRIMARY KEY,
      email TEXT NOT NULL,
      numberOfUse INTEGER DEFAULT 0 CHECK (numberOfUse < 4) NOT NULL,
      isExpired INTEGER DEFAULT 0 NOT NULL
    );
`;



export const sqlCode = {
  inserts: {
    transaction: `INSERT INTO transactions(transactionID, email, fullName, numberOfKeys, costOfTransaction) VALUES(?,?,?,?,?)`,
    key: `INSERT INTO keys(key, email) VALUES(?, ?)`
  },
  query: {
    transaction: `SELECT fullName, costOfTransaction, numberOfKeys FROM transactions WHERE transactionID = ?`,
    key: `SELECT key, numberOfUse, isExpired FROM keys WHERE key = ?`
  },
  update: {
    transaction: `UPDATE transactions SET isSuccessful = 1, paidAt = (datetime('now', 'localtime')) WHERE transactionID = ?`,
    key: {
      update: `UPDATE keys SET numberOfUse = numberOfUse + 1 WHERE key = ?`,
      expire: `UPDATE keys SET isExpired = 1 WHERE key = ?`
    }
  },
};
