const sqlite3 = require('sqlite3').verbose();
const bcrypt  = require('bcryptjs');
const path    = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../data.db'));

function initDB() {
  db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      email      TEXT UNIQUE NOT NULL,
      password   TEXT NOT NULL,
      role       TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name   TEXT    NOT NULL,
      product_price  INTEGER NOT NULL,
      product_img    TEXT,
      customer_name  TEXT    NOT NULL,
      customer_phone TEXT    NOT NULL,
      customer_city  TEXT    NOT NULL,
      customer_note  TEXT,
      payment_phone  TEXT    NOT NULL,
      status         TEXT    DEFAULT 'pending',
      created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS messages (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      subject    TEXT,
      message    TEXT NOT NULL,
      read       INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Admin par défaut
    db.get('SELECT id FROM users WHERE email = ?', [process.env.ADMIN_EMAIL], (err, row) => {
      if (!row) {
        const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
        db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
          ['Joseph Dehazounde', process.env.ADMIN_EMAIL, hash, 'admin'],
          () => console.log('✅ Admin créé :', process.env.ADMIN_EMAIL)
        );
      }
    });

    console.log('✅ Base de données initialisée (data.db)');
  });
}

// Helpers pour utiliser db comme before (promesses)
db.asyncGet = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => err ? reject(err) : resolve(row));
});
db.asyncAll = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
});
db.asyncRun = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function(err) { err ? reject(err) : resolve({ lastID: this.lastID }); });
});

module.exports = { db, initDB };
