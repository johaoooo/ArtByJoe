const sqlite3 = require('better-sqlite3');
const path    = require('path');
const fs      = require('fs');

const DATA_DIR = process.env.RAILWAY_VOLUME_MOUNT_PATH || path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = path.join(DATA_DIR, 'data.db');
console.log('Base de donnees :', DB_PATH);

const db = new sqlite3(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.asyncGet = (sql, params = []) => new Promise((res, rej) => {
  try { res(db.prepare(sql).get(...params)); } catch(e) { rej(e); }
});
db.asyncAll = (sql, params = []) => new Promise((res, rej) => {
  try { res(db.prepare(sql).all(...params)); } catch(e) { rej(e); }
});
db.asyncRun = (sql, params = []) => new Promise((res, rej) => {
  try { res(db.prepare(sql).run(...params)); } catch(e) { rej(e); }
});

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    email      TEXT    UNIQUE NOT NULL,
    password   TEXT    NOT NULL,
    role       TEXT    DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS orders (
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
  );
  CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    subject    TEXT,
    message    TEXT NOT NULL,
    read       INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    price       INTEGER NOT NULL,
    category    TEXT    DEFAULT 'sandales',
    badge       TEXT,
    description TEXT,
    image_url   TEXT,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS gallery (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    url        TEXT    NOT NULL,
    category   TEXT    DEFAULT 'autres',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS formations (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    price       INTEGER NOT NULL,
    description TEXT,
    image_url   TEXT,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function initDB() {
  try {
    const bcrypt = require('bcryptjs');
    const existing = await db.asyncGet("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
    if (!existing) {
      const email    = process.env.ADMIN_EMAIL    || 'admin@artbyjoe.com';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      const name     = process.env.ADMIN_NAME     || 'Joseph Dehazounde';
      const hash     = await bcrypt.hash(password, 10);
      await db.asyncRun(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')",
        [name, email, hash]
      );
      console.log('Admin cree :', email);
    }
    console.log('Base de donnees initialisee');
  } catch(e) {
    console.error('Erreur init DB :', e.message);
  }
}

module.exports = { db, initDB };
