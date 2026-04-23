import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDb() {
  if (db) return db;
  
  db = await open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });

  await initDb(db);
  return db;
}

async function initDb(database: Database) {
  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      gold INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS levels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      available_words TEXT,
      target_sentence TEXT
    );
  `);

  // Seed the user if doesn't exist
  const user = await database.get('SELECT * FROM users WHERE id = ?', ['leo']);
  if (!user) {
    await database.run('INSERT INTO users (id, gold) VALUES (?, ?)', ['leo', 1250]);
  }

  // Seed some levels if none exist
  const levelCount = await database.get('SELECT COUNT(*) as count FROM levels');
  if (levelCount.count === 0) {
    await database.run(`INSERT INTO levels (available_words, target_sentence) VALUES (?, ?)`, 
      [JSON.stringify(['Hello', 'My', 'Is', 'Name']), JSON.stringify(['Hello', 'My', 'Name', 'Is'])]
    );
    await database.run(`INSERT INTO levels (available_words, target_sentence) VALUES (?, ?)`, 
      [JSON.stringify(['Cat', 'The', 'Jumped', 'Brown']), JSON.stringify(['The', 'Brown', 'Cat', 'Jumped'])]
    );
    await database.run(`INSERT INTO levels (available_words, target_sentence) VALUES (?, ?)`, 
      [JSON.stringify(['Apples', 'Like', 'I', 'Red']), JSON.stringify(['I', 'Like', 'Red', 'Apples'])]
    );
  }
}
