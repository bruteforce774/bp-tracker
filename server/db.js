import Database from 'better-sqlite3';

const db = new Database('bp.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    systolic INTEGER NOT NULL,
    diastolic INTEGER NOT NULL,
    timestamp TEXT NOT NULL
  )
`);

export default db;
