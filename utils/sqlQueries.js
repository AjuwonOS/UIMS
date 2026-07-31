export const transactionTable = `
    CREATE TABLE IF NOT EXISTs transactions (
        transactionID TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        fullName TEXT NOT NULL,
        numberOfKeys INTEGER NOT NULL,
        costOfTransaction INTEGER NOT NULL,
        isSuccessfull BOOLEAN DEFAULT FALSE,
        createAt TEXT DEFAULT (datetime('now', 'localtime')),
        paidAt TEXT
    );
`;

export const sqlQueries = {
  inserts: {
    transaction: `INSERT INTO transactions(transactionID, email, fullName, numberOfKeys, costOfTransaction) VALUES(?,?,?,?,?)`,
  },
};
