
CREATE TABLE IF NOT EXISTS users (
    user_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    username  TEXT UNIQUE NOT NULL,
    balance   REAL NOT NULL DEFAULT 0.0
);


CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INTEGER PRIMARY KEY INCREMENT,
    sender_id      INTEGER,
    receiver_id    INTEGER,
    amount         REAL,
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(sender_id)   REFERENCES users(user_id),
    FOREIGN KEY(receiver_id) REFERENCES users(user_id)
);

INSERT INTO users (username, balance) VALUES ('Alice', 100.0);
INSERT INTO users (username, balance) VALUES ('Bob',   50.0);


BEGIN TRANSACTION;

    UPDATE users
       SET balance = balance - 10
     WHERE user_id = 1;

    UPDATE users
       SET balance = balance + 10
     WHERE user_id = 2;

    INSERT INTO transactions (sender_id, receiver_id, amount)
    VALUES (1, 2, 10);

COMMIT;

SELECT * FROM users;

SELECT * FROM transactions;
